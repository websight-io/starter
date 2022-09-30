[![CI](https://github.com/websight-io/starter/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/websight-io/starter/actions/workflows/ci.yml)

# WebSight Starter

WebSight Starter is a sample project built on top of the [Websight CMS Community Edition](https://www.websight.io/). It contains a demo page called _Luna_ built with [Howlite](https://github.com/websight-io/howlite) components.

## Playground

Set up a local on-demand environment with the released WebSight CMS CE Docker images by running:

```bash
curl https://www.websight.io/scripts/get.sh | sh
```

and then see the results on [localhost:8080/apps/websight/index.html/content::spaces](http://localhost:8080/apps/websight/index.html/content::spaces) (credentials are `wsadmin`/`wsadmin`).

![Luna screenshot](/assets/luna-screenshot.png "Luna screenshot")

For more details see our [Authoring Quick Start Guide](https://www.websight.io/docs/quick-start/).

## Development

### Prerequisites

- [AdoptOpenJDK 17](https://adoptium.net/) with `x64`/`aarch64` architecture (on mac use `brew install openjdk@17`).
- Maven 3.8.5+
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### How to build

Run the command

```bash
./mvnw clean verify -P e2e
```

to build the sample websight, aggregate all required CMS dependencies, run end-to-end tests with Cypress, build Docker images (`ds/nginx-luna:latest`, `ds/websight-cms-luna:latest`).

### How to run

Once Docker images are ready, all you need is to run Docker Compose from the `environment` folder:

```bash
docker compose up
```

## Project structure

- `luna` - contains Luna project with sample content
- `distribution` - contains Luna distribution in form of a Docker image
- `environment` - contains scripts and instruction on how to run Luna local environment using Docker Compose

## Community

To support us, you may follow the project at:

* feel free to star this repository, open [issues](https://github.com/websight-io/starter/issues), and start [discussions](https://github.com/websight-io/starter/discussions)
* [linkedin.com/company/websight-io/](https://www.linkedin.com/company/websight-io/)
* [twitter.com/websight_io](https://twitter.com/websight_io)

## License

WebSight Starter and [Howlite components](https://github.com/websight-io/howlite) are `open-source` with `Apache License 2.0` license.

WebSight CMS Community Edition is free to use for everyone ([terms of use](https://www.websight.io/terms-of-use/)).
