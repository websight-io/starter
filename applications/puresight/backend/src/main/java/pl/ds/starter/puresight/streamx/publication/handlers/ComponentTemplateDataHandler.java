package pl.ds.starter.puresight.streamx.publication.handlers;

import dev.streamx.sling.connector.PublicationHandler;
import dev.streamx.sling.connector.PublishData;
import dev.streamx.sling.connector.UnpublishData;
import java.io.IOException;
import java.io.InputStream;
import java.nio.ByteBuffer;
import java.util.List;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

// TODO:Triggering of this handler is cased by bundle header 'WebSight-Apps-WebRoot' - this should
//  be improved as the component templates are not web resources.
@Component
@Designate(ocd = ComponentTemplateDataHandlerConfig.class)
public class ComponentTemplateDataHandler implements PublicationHandler<TemplateModel> {

  private static final Logger LOG = LoggerFactory.getLogger(ComponentTemplateDataHandler.class);

  @Reference
  private ResourceResolverProvider resourceResolverProvider;

  private String publicationChannel;
  private List<String> templatesRoots;
  private boolean enabled;

  @Activate
  @Modified
  private void activate(ComponentTemplateDataHandlerConfig config) {
    publicationChannel = config.publication_channel();
    templatesRoots = List.of(config.templates_roots());
    enabled = config.enabled();
  }

  @Override
  public String getId() {
    return "PureSight-Component-Templates-Handler";
  }

  @Override
  public boolean canHandle(String resourcePath) {
    return enabled && templatesRoots.stream().anyMatch(resourcePath::startsWith);
  }

  @Override
  public PublishData<TemplateModel> getPublishData(String resourcePath) {
    try (ResourceResolver resourceResolver = resourceResolverProvider.getResourceResolver()) {
      Resource resource = resourceResolver.getResource(resourcePath);
      if (resource != null) {
        TemplateModel template = resolveData(resource);
        if (template != null) {
          return new PublishData<>(resourcePath, publicationChannel,
              TemplateModel.class, template);
        }
      }
    } catch (IOException e) {
      LOG.error("IOException occurred when getting data for resource {}", resourcePath);
    } catch (LoginException e) {
      LOG.error("Cannot get resource resolver.");
    }
    LOG.info("Cannot prepare publish data for {}.", resourcePath);
    return null;
  }

  @Override
  public UnpublishData<TemplateModel> getUnpublishData(String resourcePath) {
    // no unpublishing of components templates
    return null;
  }

  public TemplateModel resolveData(Resource resource) throws IOException {
    try (InputStream inputStream = resource.adaptTo(InputStream.class)) {
      if (inputStream != null) {
        return new TemplateModel(ByteBuffer.wrap(inputStream.readAllBytes()));
      }
    }
    return null;
  }

}
