package pl.ds.starter.puresight.cms.services.impl;

import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;
import pl.ds.starter.puresight.cms.services.TemplateBasedComponentRuntimeConfigService;

@Component(service = TemplateBasedComponentRuntimeConfigService.class)
@Designate(ocd = NewsletterConfigServiceImpl.Config.class)
public class TemplateBasedComponentRuntimeConfigServiceImpl implements
    TemplateBasedComponentRuntimeConfigService {

  @ObjectClassDefinition(
      name = "PureSight Template Based Component Runtime Configuration"
  )
  public @interface Config {

    @AttributeDefinition(name = "Fragments base dir")
    String fragmentsBaseDir();

    @AttributeDefinition(name = "Product base path")
    String productBasePath();

  }

  private String fragmentsBaseDir;
  private String productBasePath;

  @Activate
  @Modified
  protected void activate(TemplateBasedComponentRuntimeConfigServiceImpl.Config config) {
    fragmentsBaseDir = config.fragmentsBaseDir();
    productBasePath = config.productBasePath();
  }

  @Override
  public String getFragmentsBaseDir() {
    return fragmentsBaseDir;
  }

  @Override
  public String getProductBasePath() {
    return productBasePath;
  }
}
