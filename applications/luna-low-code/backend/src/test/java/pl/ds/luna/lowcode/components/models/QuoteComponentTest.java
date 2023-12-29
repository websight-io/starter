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

import static java.util.Objects.requireNonNull;
import static org.assertj.core.api.Assertions.assertThat;

import org.apache.sling.testing.mock.sling.ResourceResolverType;
import org.apache.sling.testing.mock.sling.junit5.SlingContext;
import org.apache.sling.testing.mock.sling.junit5.SlingContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import pl.ds.luna.lowcode.components.models.QuoteComponent;

@ExtendWith(SlingContextExtension.class)
class QuoteComponentTest {

  private static final String PATH = "/content/quote";

  private final SlingContext context = new SlingContext(ResourceResolverType.RESOURCERESOLVER_MOCK);

  @BeforeEach
  public void init() {
    context.addModelsForClasses(QuoteComponent.class);
    context.load().json(requireNonNull(
        Thread.currentThread().getContextClassLoader().getResourceAsStream("quote.json")), PATH);
  }

  @Test
  void defaultQuoteComponentModelTest() {
    QuoteComponent model = requireNonNull(
        context.resourceResolver().getResource(PATH + "/default")).adaptTo(QuoteComponent.class);

    assertThat(model).isNotNull();
    assertThat(model.getText()).isEqualTo(
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel dictum eros.");
    assertThat(model.isShowImage()).isFalse();
  }

  @Test
  void quoteComponentModelTest() {
    QuoteComponent model = requireNonNull(
        context.resourceResolver().getResource(PATH + "/complex")).adaptTo(QuoteComponent.class);

    assertThat(model).isNotNull();
    assertThat(model.getText()).isEqualTo("Text");
    assertThat(model.getAuthorName()).isEqualTo("Author name");
    assertThat(model.getAuthorDescription()).isEqualTo("Author description");
    assertThat(model.isShowImage()).isTrue();
    assertThat(model.getAuthorImage()).isEqualTo("http:///content/bulma/assets/images/personal/Janet.png");
    assertThat(model.getImageAlt()).isEqualTo("Alt text");

  }
}
