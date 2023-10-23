# Releasing
WebSight Starter release is done using GitHub Actions `Release Starter` workflow.

The 'Prepare release' step requires configuring:
- a public key as [deploy keys](https://docs.github.com/v3/guides/managing-deploy-keys/#deploy-keys) 
- a private key as a GitHub Action secret (`SSH_SECRET_KEY`).

## Versioning
We try to keep the versioning of the starter project the same as the main [WebSight CMS version](https://docs.websight.io/cms/release-notes/).
When releasing the starter project, please consult the CMS engineering team about the next version.
