# How to contribute
WebSight Starter is a sample open-source project built on top of the Websight CMS Community Edition administered by the [Dynamic Solution](https://www.ds.pl/). We appreciate your interest and efforts to contribute to Websight Starter. See the [LICENSE](./LICENSE) licensing information and the [contributing](#contributor-license-agreement-cla) (CLA) information.

We highly appreciate your effort to contribute, but we recommend you [discuss](https://github.com/websight-io/starter/discussions) to a maintainer before spending a lot of time making a pull request that may not align with the project roadmap.

## Feature Requests
Feature Requests by the community are highly encouraged. Feel free to [submit a new one](https://github.com/websight-io/starter/issues/new?assignees=&labels=&template=feature_request.md&title=).

## Bugs
WebSight Starter is using [GitHub issues](https://github.com/websight-io/starter/issues) to manage bugs. We keep a close eye on them. Before filing a new issue, try to ensure your problem does not already exist.

## Code of Conduct
This project, and everyone participating in it, are governed by the [WebSight Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold it. Make sure to read the [full text](CODE_OF_CONDUCT.md) to understand which type of actions may or may not be tolerated.

## Contributor License Agreement (CLA)

### Individual contribution

You need to sign a [Dynamic Solutions Individual Contributor License Agreement](https://www.websight.io/product/cla/individual/v1/) (CLA) to accept your pull request. You only need to do this once. If you submit a pull request for the first time, we will ask you to sign our CLA before merging the pull request.

### Company contribution

If you make contributions to our repositories on behalf of your company, we will need a [Dynamic Solutions Corporate Contributor License Agreement](https://www.websight.io/product/cla/corporate/v1/) signed. To do that, please get in touch with us at [websight@ds.pl](mailto:websight@ds.pl).

## Documentation

Pull requests related to fixing documentation for the latest release should be directed towards the [documentation repository](https://github.com/websight-io/docs).

## Before Submitting a Pull Request

### Coding standards

Follow Google Style Guide code formatting, particularly set your IDE `tab size`/`ident` to 2 spaces 
and `continuation ident` to 4 spaces.
  - [Google Style Guide for Eclipse](https://raw.githubusercontent.com/google/styleguide/gh-pages/eclipse-java-google-style.xml)
  - [Google Style Guide for IntelliJ](https://raw.githubusercontent.com/google/styleguide/gh-pages/intellij-java-google-style.xml)

Additionally, we use the `maven-checkstyle-plugin` plugin to validate all rules, so if there is some
checkstyle issue, our `mvn clean install` should fail with the message:

```bash
[INFO] Starting audit...
[WARN] /Projects/websight/projects/howlite/core/src/main/java/pl/ds/howlite/components/models/AccordionItemComponent.java:12:8: 'member def modifier' has incorrect indentation level 7, expected level should be 2. [Indentation]
[WARN] /Projects/websight/projects/howlite/core/src/main/java/pl/ds/howlite/components/models/AccordionItemComponent.java:13:3: Annotation 'Inject' have incorrect indentation level 2, expected level should be 7. [AnnotationLocationVariables]
[WARN] /Projects/websight/projects/howlite/core/src/main/java/pl/ds/howlite/components/models/AccordionItemComponent.java:14:3: Annotation 'Default' have incorrect indentation level 2, expected level should be 7. [AnnotationLocationVariables]
Audit done.
```

