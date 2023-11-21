/*
 * Copyright (C) 2022 Dynamic Solutions
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package pl.ds.luna.lowcode.components.models;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import pl.ds.luna.lowcode.components.models.CarouselComponent;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class CarouselItemComponent {

  private static final int BULMA_GRID_COLUMN_SIZE = 12;
  private static final String BULMA_COLUMN_CLASS_PREFIX = "is-";
  private static final String BULMA_COLUMN_ONE_FIFTH = "one-fifth";


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

    columnClass = BULMA_COLUMN_CLASS_PREFIX;

    if (slidesToShow == 5) {
      columnClass += BULMA_COLUMN_ONE_FIFTH;
    } else {
      columnClass += String.valueOf(BULMA_GRID_COLUMN_SIZE / slidesToShow);
    }
  }

  public String getColumnClass() {
    return columnClass;
  }
}
