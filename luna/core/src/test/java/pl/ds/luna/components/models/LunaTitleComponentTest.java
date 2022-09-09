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

import static java.util.Objects.requireNonNull;
import static org.assertj.core.api.Assertions.assertThat;

import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.apache.sling.testing.mock.sling.junit5.SlingContext;
import org.apache.sling.testing.mock.sling.junit5.SlingContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

@ExtendWith(SlingContextExtension.class)
class LunaTitleComponentTest {

  private static final String PATH = "/content/title";
  private final SlingContext context = new SlingContext(ResourceResolverType.RESOURCERESOLVER_MOCK);

  @BeforeEach
  public void init() {
    context.addModelsForClasses(LunaTitleComponent.class);
    context.load().json(requireNonNull(
        Thread.currentThread().getContextClassLoader().getResourceAsStream("title.json")), PATH);
  }

  @Test
  void defaultTitleComponentModelTest() {
    LunaTitleComponent model = requireNonNull(
        context.resourceResolver().getResource(PATH + "/default")).adaptTo(LunaTitleComponent.class);

    assertThat(model).isNotNull();
    assertThat(model.getTitle()).isEqualTo("Add your heading here");
    assertThat(model.getSubtitle()).isEqualTo("Add your text here");
    assertThat(model.getHeadingLevel()).isEqualTo("h2");
    assertThat(model.getHeadingSize()).isEqualTo("hl-title__heading--size-4");
  }

  @Test
  void titleComponentModelTest() {
    LunaTitleComponent model = requireNonNull(
        context.resourceResolver().getResource(PATH + "/complex")).adaptTo(LunaTitleComponent.class);

    assertThat(model).isNotNull();
    assertThat(model.getTitle()).isEqualTo("Title");
    assertThat(model.getSubtitle()).isEqualTo("Subtitle");
    assertThat(model.getHeadingLevel()).isEqualTo("h1");
    assertThat(model.getHeadingSize()).isEqualTo("hl-title__heading--size-1");
  }

}