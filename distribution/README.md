# Distribution
It builds a WebSight distribution containing all dependencies, configurations, running scripts, sample Howlite components and Luna content. 

The builds two Docker images:

- CMS with Luna - `ds/websight-cms-starter:latest`
- HTTP server exposing published assets - `ds/websight-nginx-starter:latest`

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
java --add-opens java.base/java.lang=ALL-UNNAMED -jar target/dependency/org.apache.sling.feature.launcher.jar -f target/slingfeature-tmp/feature-websight-cms-starter.json
```

and open [localhost:8080](http://localhost:8080/) to see the CMS admin panel (use default `wsadmin/wsadmin` password).

Press `CTRL + C` to stop the application.

## References
Please see the [Websight](https://www.websight.io/).

# Integration tests

During module building, there are running integration tests.

You can pass the following system property variables to override some settings of the websight-cms-ce-feature test jar:

| Env name                        | default value      | description                                                    |
|---------------------------------|--------------------|----------------------------------------------------------------|
| WS_ADMIN_USERNAME               | wsadmin            | The username for the administrator.                            |
| WS_ADMIN_PASSWORD               | wsadmin            | The password for the administrator.                            |
| WS_HTTP_PORT                    | 8080               | The default port on which tests expect the application to run. | 
| WS_ERROR_LOG                    | /logs/error.log    | The location of an error log file.                             | 
| WS_APPLICATION_VERSION          | 8080               | WebSight CMS version.                                          | 
| INSTALLED_PACKAGES_GROUP_{NAME} | -                  | Installed packages group.                                      |
| INSTALLED_PACKAGES_COUNT_{NAME} | Integer.MAX_VALUE  | The number of installed packages for the corresponding group.  |
| WS_DATABASE                     | MONGO              | The database type. Possible values: MONGO, TAR, OTHER          |

INSTALLED_PACKAGES_GROUP_{NAME} and INSTALLED_PACKAGES_COUNT_{NAME} can be set multiple times with different names.
