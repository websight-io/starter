# End-to-end tests
This module is responsible for the automatic validation of the Starter components.

It contains:
- [content](./content) - providing the minimal set of pages and assets in paths:
  - `/content/low-code-luna-test/*`
  - `/content/starter-tests/*`
- [end-to-end](./end-to-end) - end-to-end tests validating Starter components on authoring and publication
  - functional tests with `Cypress`
  - visual tests with `BackstopJS`

## Functional tests
We use [Cypress](https://www.cypress.io) to perform functional testing.

### Running locally
From project `<ROOT>` folder build the latest CMS distribution and test content package:
```bash
./mvnw clean install
```

From `./end-to-end` folder run CMS instance with testing content package:
```bash
java --add-opens java.base/java.lang=ALL-UNNAMED -jar target/dependency/org.apache.sling.feature.launcher.jar -f target/slingfeature-tmp/feature-starter-project-tests.json
```

From `./end-to-end` folder run Cypress
```bash
npm run dev
```

From `./end-to-end` folder cleanup CMS instance changes/repository
```bash
rm -rf launcher
```

### Running from Maven
From project `<ROOT>` folder run:
```bash
./mvnw clean verify -P e2e-functional
```

## Visual tests
We use [BackstopJS](https://github.com/garris/BackstopJS) for visual regression tests. These tests 
compare screenshots stored in `./end-to-end/backstop_data/bitmaps_reference` created by 
`backstop reference` task.

> Please note that reference screenshots are not stored in GIT repository.

### Running locally
From project `<ROOT>` folder build the latest CMS distribution and test content package:
```bash
./mvnw clean install
```

From `./end-to-end` folder run CMS instance with testing content package:
```bash
java --add-opens java.base/java.lang=ALL-UNNAMED -jar target/dependency/org.apache.sling.feature.launcher.jar -f target/slingfeature-tmp/feature-starter-project-tests.json
```

From `./end-to-end` folder publish all pages
```bash
npm install -g ts-node
baseUrlCms=http://localhost:8080 ts-node ./utils/content.publish/content.publish.cli.ts
```

From `./end-to-end` folder gather reference screenshots (`backstop_data/bitmaps_reference`)
```bash
npm run test:visual:seed
```

From `./end-to-end` folder test the changes comparing the current CMS results with gahtered ones
```bash
npm run test:visual:check
```

### Running from Maven
From project `<ROOT>` folder run:
```bash
./mvnw clean verify -P e2e-visual-seed
./mvnw clean verify -P e2e-visual-check
```