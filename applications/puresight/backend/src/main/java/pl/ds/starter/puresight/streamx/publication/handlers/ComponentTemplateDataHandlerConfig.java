package pl.ds.starter.puresight.streamx.publication.handlers;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "PureSight - Component Templates Resources Publication Config")
@interface ComponentTemplateDataHandlerConfig {

  @AttributeDefinition(name = "Publications channel name for pages")
  String publication_channel() default "templates";

  @AttributeDefinition(name = "Templates roots")
  String[] templates_roots() default {"/apps/puresight/components/templates"};

  @AttributeDefinition(name = "Enable handler", description =
      "If the flag is unset the handler won't proceed.")
  boolean enabled() default true;

}
