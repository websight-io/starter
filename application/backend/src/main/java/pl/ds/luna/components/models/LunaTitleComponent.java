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

package pl.ds.luna.components.models;

import javax.inject.Inject;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import pl.ds.howlite.components.Grid;
import pl.ds.howlite.components.Styled;
import pl.ds.howlite.components.models.DefaultStyledGridComponent;

@Model(adaptables = Resource.class)
public class LunaTitleComponent implements Styled, Grid {

  @Inject
  @Default(values = "Add your heading here")
  private String title;

  @Inject
  @Default(values = "h2")
  private String headingLevel;

  @Inject
  @Default(values = "hl-title__heading--size-4")
  private String headingSize;

  @Inject
  @Default(booleanValues = false)
  private Boolean showSubtitle;

  @Inject
  @Default(values = "Add your text here")
  private String subtitle;

  @Inject
  @Default(values = "")
  private String anchorId;

  @Self
  private DefaultStyledGridComponent style;


  @Override
  public Integer getSmColSize() {
    return style.getSmColSize();
  }

  @Override
  public Integer getMdColSize() {
    return style.getMdColSize();
  }

  @Override
  public Integer getLgColSize() {
    return style.getLgColSize();
  }

  @Override
  public Integer getSmOffset() {
    return style.getSmOffset();
  }

  @Override
  public Integer getMdOffset() {
    return style.getMdOffset();
  }

  @Override
  public Integer getLgOffset() {
    return style.getLgOffset();
  }

  @Override
  public String[] getClasses() {
    return style.getClasses();
  }


  public String getTitle() {
    return title;
  }

  public String getHeadingLevel() {
    return headingLevel;
  }

  public String getHeadingSize() {
    return headingSize;
  }

  public Boolean getShowSubtitle() {
    return showSubtitle;
  }

  public String getSubtitle() {
    return subtitle;
  }

  public String getAnchorId() {
    return anchorId;
  }
}
