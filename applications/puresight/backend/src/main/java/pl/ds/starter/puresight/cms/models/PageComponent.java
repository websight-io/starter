/*
 * Copyright (C) 2023 Dynamic Solutions
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

package pl.ds.starter.puresight.cms.models;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mitchellbosecke.pebble.PebbleEngine;
import com.mitchellbosecke.pebble.loader.StringLoader;
import com.mitchellbosecke.pebble.template.PebbleTemplate;
import java.io.IOException;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.Map;
import javax.inject.Inject;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.engine.SlingRequestProcessor;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.servlethelpers.internalrequests.SlingInternalRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Model(adaptables = SlingHttpServletRequest.class,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class PageComponent {

  private static final Logger LOG = LoggerFactory.getLogger(PageComponent.class);

  private final Resource resource;

  @ValueMapValue
  private boolean hasTemplateData;

  @ValueMapValue
  private String data;

  private final SlingRequestProcessor requestProcessor;

  private final PebbleEngine pebbleEngine;

  @Inject
  public PageComponent(@OSGiService SlingRequestProcessor requestProcessor,
      @SlingObject Resource resource) {
    this.requestProcessor = requestProcessor;
    this.resource = resource;
    this.pebbleEngine = new PebbleEngine.Builder().loader(new StringLoader())
        .newLineTrimming(false)
        .cacheActive(false)
        .build();
  }

  public boolean isHasTemplateData() {
    return hasTemplateData;
  }

  public String getRenderedHtml() {
    String renderedHtml = "";
    try {
      String pageHtml = this.getPageHtml(resource);
      Map<String, Object> templateData = this.getTemplateData();
      renderedHtml = this.getFilledTemplate(pageHtml, templateData);
    } catch (IOException e) {
      LOG.error("Error with reading page html {}", resource.getPath(), e);
    }
    return renderedHtml;
  }


  public String getPageHtml(Resource resource) throws IOException {
    return new SlingInternalRequest(resource.getResourceResolver(), requestProcessor,
        resource.getPath())
        .withExtension("html")
        .execute()
        .getResponseAsString();
  }

  public Map<String, Object> getTemplateData() {
    Map<String, Object> templateData = new HashMap<>();
    try {
      templateData = new ObjectMapper().readValue(data, HashMap.class);
    } catch (JsonProcessingException e) {
      LOG.error("Incorrect template data format {}", data, e);
    }
    return templateData;
  }

  public String getFilledTemplate(String template, Map<String, Object> data) {
    PebbleTemplate pebbleTemplate = pebbleEngine.getTemplate(template);
    StringWriter writer = new StringWriter();
    try {
      pebbleTemplate.evaluate(writer, data);
    } catch (IOException e) {
      LOG.error("Error while filling template: {}", template, e);
      return template;
    }
    return writer.toString();
  }

}
