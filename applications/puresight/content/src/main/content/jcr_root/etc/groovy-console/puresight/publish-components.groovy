import dev.streamx.clients.ingestion.StreamxClient;

import dev.streamx.blueprints.data.Renderer;
import dev.streamx.blueprints.data.RenderingContext;

import org.apache.commons.lang3.StringUtils;
import java.nio.ByteBuffer;


publishComponents()

def publishComponents() {
  StreamxClient client = getClient()
  try {
    publishRenderer(client, "/apps/puresight/components/templates/carousel.html")
    publishRenderer(client, "/apps/puresight/components/templates/tiles.html")

    publishRenderingContext(client, "products-carousel", new RenderingContext(
      "/apps/puresight/components/templates/carousel.html",
      "collected:products:.*",
      "/published/puresight/pages/_fragments/{{key}}.carousel.html",
      RenderingContext.OutputType.FRAGMENT
    ))
    publishRenderingContext(client, "products-tiles", new RenderingContext(
      "/apps/puresight/components/templates/carousel.html",
      "collected:products:.*",
      "/published/puresight/pages/_fragments/{{key}}.tiles.html",
      RenderingContext.OutputType.FRAGMENT
    ))
  } finally {
    if (client != null) {
      client.close()
    }
  }
}

def publishRenderingContext(StreamxClient client, String key, RenderingContext context) {
  logPublishSuccess(
    client.newPublisher("rendering-contexts", RenderingContext.class)
      .publish(key, context)
  )
}

def publishRenderer(StreamxClient client, String path) {
  logPublishSuccess(
    client.newPublisher("renderers", Renderer.class)
      .publish(path, getRenderer(path))
  )
}

def logPublishSuccess(success) {
  println "Published (" + success.eventTime + ") " + success.key 
}

def getRenderer(String path) throws IOException {
  Resource resource = getResource(path)
  if (resource != null) {
    InputStream inputStream = resource.adaptTo(InputStream.class)
    try {
      if (inputStream != null) {
        return new Renderer(ByteBuffer.wrap(inputStream.readAllBytes()));
      }
    } finally {
      if (inputStream != null) {
        inputStream.close()
      }
    }
  }
  throw new IllegalStateException("No renderer " + path)
}

def getClient() {
  def config = getConfig()
  return StreamxClient.builder( (String) config.getStreamxUrl())
    .setAuthToken(!StringUtils.isBlank(config.getAuthToken()) ? config.getAuthToken() : null)
    .build()
}

def getConfig() {
  def services = getServices("dev.streamx.sling.connector.impl.StreamxClientConfig", "(name=puresight)")
  if (services != null && services.size() == 1) {
    return services[0]
  }
  throw new IllegalStateException("No client config")
}