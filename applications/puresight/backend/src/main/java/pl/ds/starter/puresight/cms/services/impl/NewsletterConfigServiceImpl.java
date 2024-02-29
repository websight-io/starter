package pl.ds.starter.puresight.cms.services.impl;

import pl.ds.starter.puresight.cms.services.NewsletterConfigService;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.ConfigurationPolicy;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@Component(
    service = NewsletterConfigService.class
)
@Designate(ocd = NewsletterConfigServiceImpl.Config.class)
public class NewsletterConfigServiceImpl implements  NewsletterConfigService {

    @ObjectClassDefinition(
        name = "Newsletter Configuration",
        description = "Configuration for the Newsletter Component"
    )
    public @interface Config {
        @AttributeDefinition(name = "Button Text", description = "Text for the newsletter button")
        String newsletterUrl() default "/bin/newsletter";
    }

    private String newsletterUrl;

    @Activate
    @Modified
    protected void activate(Config config) {
        newsletterUrl = config.newsletterUrl();
    }

    @Override
    public String getNewsletterUrl() {
        return newsletterUrl;
    }

}
