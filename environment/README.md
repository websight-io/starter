# Environments

For local usage and development only.

See:
- [`local-mongo`](./local-mongo)

## Ephemeral environments

Ephemeral environments are for development (bugfix/feature testing) and demo purposes only (they are not meant to be used for a long time). Those environments are backed by Google [Cloud Run](https://cloud.google.com/run) service.

To create an ephemeral environment, run the [Ephemeral environment - create](https://github.com/websight-io/starter/actions/workflows/ephemeral-env-create.yml) workflow (you may choose the branch you want to create the environment from). It will spawn a new environment and print the CMS panel URL in the console.

To update the environment, run the [Ephemeral environment - create](https://github.com/websight-io/starter/actions/workflows/ephemeral-env-create.yml) action agian from the same branch. It will update the environment with the latest changes on the branch. The URL will not change. Note, that all manual chagnes (like publications and content changes) will be lost.

To delete ephemeral environment, run the [Ephemeral environment - destroy](https://github.com/websight-io/starter/actions/workflows/ephemeral-env-destroy.yml) workflow.

> Important!
>
> At the moment destroying ephemeral environment is not automated, always remember to delete it manually after you are done with it.

### Limitations
Cloud Run is a serverless platform that allows you to run `stateless` HTTP containers on a fully managed environment. WebSight CMS with its stateful nature is not a perfect fit for Cloud Run, but it's still possible to run it there for development purposes. However, here are some limitations to keep in mind:

- Lost data on restart: Cloud Run is a stateless platform, which means that any data stored in memory will be lost when the container is restarted. **This means that you will lose all your data when you restart the container (e.g. when you deploy new version of the container)**. This is not a problem for development purposes, but it's not recommended to use Cloud Run for production deployments.
