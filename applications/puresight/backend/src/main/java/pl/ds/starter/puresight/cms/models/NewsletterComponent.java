package pl.ds.starter.puresight.cms.models;

import pl.ds.starter.puresight.cms.services.NewsletterConfigService;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class NewsletterComponent {

  @ValueMapValue
  private String buttonText;

  @ValueMapValue
  private String placeholder;

  @OSGiService
  private NewsletterConfigService newsletterConfigService;

  public String getNewsletterUrl() {
    return newsletterConfigService.getNewsletterUrl();
  }

  public String getButtonText() {
    return buttonText;
  }

  public String getPlaceholder() {
    return placeholder;
  }

}
