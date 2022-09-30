# Distribution
It builds a WebSight distribution containing all dependencies, configurations, running scripts, sample Howlite components and Luna content. 

The builds two Docker images:

- CMS with Luna - `ds/websight-cms-luna:latest`
- HTTP server exposing published assets - `ds/nginx-luna:latest`

## Prerequisites

- Java 17 & Maven
- Docker Desktop

## How to build

Run the command

```bash
../mvnw -f pom.xml clean install
```

to assemble the distribution, build a Docker image and run integration tests.

## How to run
### Running as JVM application

```bash
docker run -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=mongoadmin -e MONGO_INITDB_ROOT_PASSWORD=mongoadmin mongo:4.4.6
java -jar target/dependency/org.apache.sling.feature.launcher.jar -f target/slingfeature-tmp/feature-websight-cms-luna.json
```

and open [localhost:8080](http://localhost:8080/) to see the CMS admin panel (use default `wsadmin/wsadmin` password).

Press `CTRL + C` to stop the application.

## References
Please see the [Websight](https://www.websight.io/).