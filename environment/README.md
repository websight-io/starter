# Environments

For local usage and development.
See [`local`](./local)


You can pass the following system property variables to override settings:

| Env name                 | default value  | description                                                         |
|--------------------------|----------------|---------------------------------------------------------------------|
| `WS_ADMIN_USERNAME`      | `wsadmin`      | The username for the administrator.                                 |
| `WS_ADMIN_PASSWORD`      | `wsadmin`      | The password for the administrator.                                 |
| `WS_HTTP_PORT`           | `8080`         | The default port on which tests expect the application to run.      |
| `WS_WEBSIGHT_LOG_LEVEL`  | `info`         | Log leve of websigh logger.                                         |
| `PROJECT_LOG_LEVEL`      | `info`         | Log level of the Luna project logger.                               |
| `LEASE_CHECK_MODE`       | `STRICT`       | The lease check mode. Available values are `STRICT` and `LENIENT`.  |