package pl.ds.luna.lowcode.components.models.carousel;

import javax.inject.Inject;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class CarouselComponent {

  @Inject
  @Default(intValues = 3)
  private int slidesToShow;

  public int getSlidesToShow() {
    return slidesToShow;
  }

}
