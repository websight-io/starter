# Environments

For local usage and development only.

See:
- [`local-mongo`](./local-mongo)
- [`local-tar`](./local-tar)
- [`remote-gcp-cloudrun`](./remote-gcp-cloudrun)

## Ephemeral environments

Ephemeral environments are for development (bugfix/feature testing) and demo purposes only (they are not meant to be used for a long time).

To create an ephemeral environment, run the [Ephemeral environment - create](https://github.com/websight-io/starter/actions/workflows/ephemeral-env-create.yml) workflow (you may choose the branch you want to create the environment from). It will spawn a new environment and print the CMS panel URL in the console.

To update the environment, run the [Ephemeral environment - create](https://github.com/websight-io/starter/actions/workflows/ephemeral-env-create.yml) action agian from the same branch. It will update the environment with the latest changes on the branch. The URL will not change. Note, that all manual chagnes (like publications and content changes) will be lost.

To delete ephemeral environment, run the [Ephemeral environment - destroy](https://github.com/websight-io/starter/actions/workflows/ephemeral-env-destroy.yml) workflow.

> Important!
>
> At the moment destroying ephemeral environment is not automated, always remember to delete it manually after you are done with it.
