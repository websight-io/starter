# Luna tests
This module is responsible for the automatic validation of the Luna components.

It contains:
- [content](./content) - providing the minimal set of components and pages used during testing
- [end-to-end](./end-to-end) - end-to-end tests validating both Luna components on authoring and publication

## How to run

```bash
../mvnw clean install -P e2e
```

Packs the content package, then builds a Docker image that contains the package. Finally, it runs the container with the created Docker image 
and runs functional tests.