# Distribution
It builds a WebSight distribution containing all dependencies, configurations, running scripts, sample Howlite components and Luna content. 

The release artifacts are:
- `slingosgifeature` file (descriptor for all projects that extend our distribution)
- ICE Docker image.

## Prerequisites
- Java 17 & Maven
- Docker Desktop

## How to build

Run the command

```bash
mvn clean install
```

to assemble the distribution, build a Docker image and run integration tests.

## How to run
### Running as JVM application
```bash
mvn clean install
docker run -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=mongoadmin -e MONGO_INITDB_ROOT_PASSWORD=mongoadmin mongo:4.4.6
java -jar target/dependency/org.apache.sling.feature.launcher.jar -f target/slingfeature-tmp/feature-websight-cms-luna.json
```

and open [localhost:8080](http://localhost:8080/) to see the ICE admin panel (use default `wsadmin/wsadmin` password).

Press `CTRL + C` to stop the application.

## References
Please see the [Websight](https://www.websight.io/).