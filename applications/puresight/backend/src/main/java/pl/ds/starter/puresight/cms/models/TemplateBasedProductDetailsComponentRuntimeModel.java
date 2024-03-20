package pl.ds.starter.puresight.cms.models;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import pl.ds.starter.puresight.cms.services.TemplateBasedComponentRuntimeConfigService;

@Model(adaptables = SlingHttpServletRequest.class)
public class TemplateBasedProductDetailsComponentRuntimeModel {

  @Inject
  private Resource resource;

  @OSGiService
  private TemplateBasedComponentRuntimeConfigService config;

  private String fragmentPath;

  @PostConstruct
  void init() {
    String template = resource.getValueMap().get("template", String.class);
    if (template != null) {
      Resource templateResource = resource.getResourceResolver().getResource(template);
      if (templateResource != null) {
        this.fragmentPath = config.getProductBasePath() + templateResource.getName();
      }
    }
  }

  public String getFragmentPath() {
    return fragmentPath;
  }

}
