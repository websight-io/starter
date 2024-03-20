package pl.ds.starter.puresight.cms.models;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import pl.ds.starter.puresight.cms.services.TemplateBasedComponentRuntimeConfigService;

@Model(adaptables = SlingHttpServletRequest.class)
public class TemplateBasedProductsComponentRuntimeModel {

  @Inject
  private Resource resource;

  @OSGiService
  private TemplateBasedComponentRuntimeConfigService config;

  private String fragmentPath;
  private String category;

  @PostConstruct
  void init() {
    String fragmentIdPrefix = resource.getValueMap().get("fragmentIdPrefix", String.class);
    category = resource.getValueMap().get("category", String.class);
    String template = resource.getValueMap().get("template", String.class);
    if (fragmentIdPrefix != null && category != null && template != null) {
      Resource templateResource = resource.getResourceResolver().getResource(template);
      if (templateResource != null) {
        this.fragmentPath = config.getFragmentsBaseDir() + fragmentIdPrefix + category + "."
            + templateResource.getName();
      }
    }
  }

  public String getFragmentPath() {
    return fragmentPath;
  }

  public String getCategory() {
    return category;
  }
}
