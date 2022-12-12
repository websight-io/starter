package pl.ds.luna.lowcode.components.models;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class CarouselItemComponent {

  @Inject
  private String columnClass;

  @SlingObject
  private Resource resource;

  @PostConstruct
  private void init() {
    CarouselComponent carouselComponent = resource.getParent().adaptTo(CarouselComponent.class);

    if (carouselComponent == null) {
      return;
    }

    int slidesToShow = carouselComponent.getSlidesToShow();

    columnClass  = "is-";
    if (slidesToShow == 5) {
      columnClass += "one-fifth";
    } else {
      columnClass += String.valueOf(12 / slidesToShow);
    }
  }

  public String getColumnClass() {
    return columnClass;
  }
}
