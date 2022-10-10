# Releasing
WebSight Starter release is done using GitHub Actions `Release Starter` workflow.

The 'Prepare release' step requires configuring:
- a public key as [deploy keys](https://docs.github.com/v3/guides/managing-deploy-keys/#deploy-keys) 
- a private key as a GitHub Action secret (`SSH_SECRET_KEY`).