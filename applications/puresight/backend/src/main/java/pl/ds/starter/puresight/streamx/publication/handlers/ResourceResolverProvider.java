package pl.ds.starter.puresight.streamx.publication.handlers;

import static org.apache.sling.api.resource.ResourceResolverFactory.SUBSERVICE;

import java.util.Map;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

@Component(service = ResourceResolverProvider.class)
public class ResourceResolverProvider {

  private static final String SERVICE_USER_ID = "streamx-connector-puresight";

  @Reference
  private ResourceResolverFactory resourceResolverFactory;

  public ResourceResolver getResourceResolver() throws LoginException {
    return resourceResolverFactory.getServiceResourceResolver(Map.of(SUBSERVICE, SERVICE_USER_ID));
  }
}
