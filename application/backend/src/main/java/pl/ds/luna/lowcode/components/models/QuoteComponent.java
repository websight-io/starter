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

import javax.inject.Inject;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class QuoteComponent {

  @Inject
  @Default(values = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel dictum eros.")
  private String text;

  @Inject
  private String authorName;

  @Inject
  private String authorDescription;

  @Inject
  private boolean showImage;

  @Inject
  private String authorImage;

  @Inject
  private String imageAlt;

  public String getText() {
    return text;
  }

  public String getAuthorName() {
    return authorName;
  }

  public String getAuthorDescription() {
    return authorDescription;
  }

  public boolean isShowImage() {
    return showImage;
  }

  public String getAuthorImage() {
    return authorImage;
  }

  public String getImageAlt() {
    return imageAlt;
  }
}
