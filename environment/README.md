# Environments

For local usage and development.
See [`local`](./local)


You can pass the following system property variables to override settings:

| Env name                 | default value  | description                                                         |
|--------------------------|----------------|---------------------------------------------------------------------|
| `WS_ADMIN_USERNAME`      | `wsadmin`      | The username for the administrator.                                 |
| `WS_HTTP_PORT`           | `8080`         | The default port on which tests expect the application to run.      |
| `WS_WEBSIGHT_LOG_LEVEL`  | `info`         | Log leve of websigh logger.                                         |
| `PROJECT_LOG_LEVEL`      | `info`         | Log level of the Luna project logger.                               |
| `LEASE_CHECK_MODE`       | `STRICT`       | The lease check mode. Available values are `STRICT` and `LENIENT`.  |

### Secret files
Secrets files are searched under following directories:

- ${sling.home}/resources/secrets,
- /run/secrets

Paths are configured in the `org.apache.felix.configadmin.plugin.interpolation.secretsdir` framework property.

You can change the following secrets:

| Secret name      | default value | description                         |
|------------------|---------------|-------------------------------------|
| `admin.password` | `wsadmin`     | The password for the administrator. |
| `mongo.password` | `mongoadmin`  | The password for the mongo.         |

To produce sample secret file you may use:

```bash
echo "mypassword" > admin_password.txt
```

You can use a secret files to change default passwords. 
To do so you can create a file with secret password. 
Then you have to add this secret file to docker-compose.yml definition:

```yaml
secrets:
  admin_password:
    file: ./admin_password.txt
```

Now you can use it in service configuration:
```yaml
services:
  cms:
    image: ds/websight-cms-luna:latest
    ...
    secrets:
      - source: admin_password
        target: admin.password
```




