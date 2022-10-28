# Integration tests

The main purpose ot these tests is to check if system is up and running as expected.

You can pass the following system property variables to override some settings of the websight-base-sling-feature test jar:

| Env name                           | default value | description                                                       |
|------------------------------------|---------------|-------------------------------------------------------------------|
| WS_ADMIN_USERNAME                  | wsadmin       | The username for the administrator.                               |
| WS_ADMIN_PASSWORD                  | wsadmin       | The password for the administrator.                               |
| WS_HTTP_PORT                       | 8080          | The default port on which tests expect the application to run.    | 
| FEATURE_EXTRA_ACTIVE_BUNDLES_COUNT | 0             | The number of additional bundles the feature is expected to add.  |

The most important is to set FEATURE_EXTRA_ACTIVE_BUNDLES_COUNT to the number of extra bundles you are expecing the feature model is providing in addition to the bundles form the base feature model.