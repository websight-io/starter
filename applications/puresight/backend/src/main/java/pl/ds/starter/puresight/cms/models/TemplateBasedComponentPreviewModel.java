package pl.ds.starter.puresight.cms.models;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mitchellbosecke.pebble.PebbleEngine;
import com.mitchellbosecke.pebble.loader.StringLoader;
import com.mitchellbosecke.pebble.template.PebbleTemplate;
import java.io.IOException;
import java.io.InputStream;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.Map;
import javax.annotation.PostConstruct;
import javax.inject.Inject;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Model(adaptables = SlingHttpServletRequest.class)
public class TemplateBasedComponentPreviewModel {

  private static final Logger LOG = LoggerFactory.getLogger(
      TemplateBasedComponentPreviewModel.class);

  @Inject
  private Resource resource;

  private PebbleEngine pebbleEngine;

  private String templatePath;

  private String templateDataPath;

  @PostConstruct
  void init() {
    String componentPath = "/apps/" + resource.getResourceType();
    this.templatePath = resource.getValueMap().get("template", String.class);
    this.templateDataPath = componentPath + "/templateData.json";
    this.pebbleEngine = new PebbleEngine.Builder().loader(new StringLoader())
        .newLineTrimming(false)
        .cacheActive(false)
        .build();
  }

  public String getRenderedHtml() {
    String renderedHtml = "";
    try {
      String pageHtml = this.getFileContent(templatePath);
      Map<String, Object> templateData = getTemplateData();
      renderedHtml = this.getFilledTemplate(pageHtml, templateData);
    } catch (IOException e) {
      LOG.warn("Cannot render component html", e);
    }
    return renderedHtml;
  }

  private String getFileContent(String path) throws IOException {
    Resource templateResource = resource.getResourceResolver().getResource(path);
    if (templateResource != null) {
      try (InputStream inputStream = templateResource.adaptTo(InputStream.class)) {
        if (inputStream != null) {
          return new String(inputStream.readAllBytes());
        }
      }
    }
    return null;
  }

  private Map<String, Object> getTemplateData() {
    Map<String, Object> templateData = new HashMap<>();
    try {
      templateData = new ObjectMapper().readValue(this.getFileContent(templateDataPath),
          HashMap.class);
    } catch (IOException e) {
      LOG.warn("Cannot load template data", e);
    }
    return templateData;
  }

  private String getFilledTemplate(String template, Map<String, Object> data) {
    PebbleTemplate pebbleTemplate = pebbleEngine.getTemplate(template);
    StringWriter writer = new StringWriter();
    try {
      pebbleTemplate.evaluate(writer, data);
    } catch (IOException e) {
      return template;
    }
    return writer.toString();
  }

}
