// This script can be tested after starting the application using http://localhost:[port]/apps/groovy

import com.fasterxml.jackson.databind.ObjectMapper
import com.streamx.blueprints.data.Renderer
import com.streamx.blueprints.data.RenderingContext
import com.streamx.clients.ingestion.StreamxClient
import io.cloudevents.CloudEvent
import io.cloudevents.core.v1.CloudEventBuilder
import io.cloudevents.jackson.JsonCloudEventData

import java.time.OffsetDateTime
import java.time.ZoneOffset

publishComponents()

void publishComponents() {
  log.info("Publishing components")

  def config = getConfig()
  StreamxClient client = getStreamxClient(config)
  String eventSource = config.eventSource as String

  try {
    publishRenderer(client, eventSource, "/apps/puresight/components/templates/carousel.html")
    publishRenderer(client, eventSource, "/apps/puresight/components/templates/tiles.html")

    publishRenderingContext(client, eventSource, "products-carousel", new RenderingContext(
      "/apps/puresight/components/templates/carousel.html",
      "collected:products:.*",
      null,
      "/_fragments/{{key}}.carousel.html",
      null,
      RenderingContext.OutputFormat.FRAGMENT
    ))
    publishRenderingContext(client, eventSource, "products-tiles", new RenderingContext(
      "/apps/puresight/components/templates/tiles.html",
      "collected:products:.*",
      null,
      "/_fragments/{{key}}.tiles.html",
      null,
      RenderingContext.OutputFormat.FRAGMENT
    ))
  } finally {
    if (client != null) {
      client.close()
    }
  }
}

StreamxClient getStreamxClient(def config) {
  return StreamxClient.create(
    config.streamxUrl as String,
    config.authToken?.isBlank() ? null : config.authToken
  )
}

void publishRenderingContext(StreamxClient client, String eventSource, String path, RenderingContext context) {
  CloudEvent event = cloudEvent(path, eventSource, RenderingContext.TYPE_PUBLISHED, context)
  CloudEvent result = client.newPublisher().send(event)
  logPublishResult(result)
}

void publishRenderer(StreamxClient client, String eventSource, String path) {
  CloudEvent event = cloudEvent(path, eventSource, Renderer.TYPE_PUBLISHED, getRenderer(path))
  CloudEvent result = client.newPublisher().send(event)
  logPublishResult(result)
}

static CloudEvent cloudEvent(String key, String eventSource, String eventType, Object data) {
  return new CloudEventBuilder()
    .withId(UUID.randomUUID().toString())
    .withSource(URI.create(eventSource))
    .withSubject(key)
    .withType(eventType)
    .withTime(OffsetDateTime.now(ZoneOffset.UTC))
    .withData(
      "application/json",
      JsonCloudEventData.wrap(new ObjectMapper().valueToTree(data)))
    .build()
}

void logPublishResult(CloudEvent result) {
  log.info("Published (" + result.time + ") " + result.subject)
}

Renderer getRenderer(String path) throws IOException {
  Resource resource = getResource(path)
  if (resource != null) {
    InputStream inputStream = resource.adaptTo(InputStream.class)
    if (inputStream != null) {
      try {
        return new Renderer(inputStream.readAllBytes())
      } finally {
        inputStream.close()
      }
    }
  }
  throw new IllegalStateException("No renderer " + path)
}

def getConfig() {
  def services = getServices("com.streamx.sling.connector.impl.StreamxClientConfig", "(name=puresight)")
  if (services?.size() == 1) {
    return services.first()
  }
  throw new IllegalStateException("No client config")
}