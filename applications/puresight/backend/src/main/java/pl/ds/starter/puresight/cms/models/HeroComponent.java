package pl.ds.starter.puresight.cms.models;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import pl.ds.kyanite.common.components.utils.LinkUtil;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class HeroComponent extends pl.ds.kyanite.common.components.models.HeroComponent {

  @ValueMapValue
  private String backgroundImage;

  @SlingObject
  private Resource resource;

  public String getBackgroundImage() {
    return LinkUtil.handleLink(backgroundImage, resource.getResourceResolver());
  }

  public String getBackgroundStyle() {
    if (!StringUtils.isEmpty(this.getBackgroundImage()) && this.isImageBackground()) {
      return "background-image: url('" + getBackgroundImage() + "');";
    }
    return "";
  }

  public boolean isImageBackground(){
    return getBackground().equals("hero-background-image");
  }
}
