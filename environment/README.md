# Environments

For local usage and development only.

See:
- [`local-mongo`](./local-mongo)
- [`local-tar`](./local-tar)
- [`remote-gcp-cloudrun`](./remote-gcp-cloudrun)

## Ephemeral environments

Ephemeral environments are environments that are not meant to be used for a long time. They are meant to be used for development purposes only (e.g. for bugfix/feature testing or demo).

To run ephemeral environment, run the [Ephemeral environment - create](https://github.com/websight-io/starter/actions/workflows/ephemeral-env-create.yml) workflow (you may choose the branch you want to run the environment from). It will create a new ephemeral environment and print the URL to the environment in the console.

To delete ephemeral environment, run the [Ephemeral environment - destroy](https://github.com/websight-io/starter/actions/workflows/ephemeral-env-destroy.yml) workflow. It will delete the ephemeral environment.

> Important!
>
> At the moment destroying ephemeral environment is not automated, always remember to delete it manually after you are done with it.
