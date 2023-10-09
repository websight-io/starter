# Local Environment

Local instance that base on the [Oak Segment Tar](https://jackrabbit.apache.org/oak/docs/nodestore/segment/overview.html).
All data is stored in the TAR repository on local volume.

## Usage

* Build
    ```bash
    ../../mvnw -f ../pom.xml clean install
    ```

* Deploy
    ```bash
    docker run -p 8080:8080 --mount source=tar-repo,target=/websight/repository ds/websight-cms-starter:latest
    ```

    Services are available with URLs:
    - [localhost:8080](http://localhost:8080/) - CMS admin panel (`wsadmin`/`wsadmin`)
    - [localhost:8080/published/luna/pages/Homepage.html](http://localhost:8080/published/luna/pages/Homepage.html) - published page

* Cleanup
    ```bash
    docker volume rm tar-repo
    ```

## Configuration

You can pass the following system property variables to override settings:

| Env name                 | default value  | description                                                        |
|--------------------------|----------------|--------------------------------------------------------------------|
| `WS_ADMIN_USERNAME`      | `wsadmin`      | The username for the administrator.                                |
| `WS_HTTP_PORT`           | `8080`         | The default port on which tests expect the application to run.     |
| `WS_WEBSIGHT_LOG_LEVEL`  | `info`         | Log leve of websigh logger.                                        |
| `PROJECT_LOG_LEVEL`      | `info`         | Log level of the Starter project logger.                           |