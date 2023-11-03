# Workflow Documentation

## Environment Variables
The following environment variables are required to run this project:
- `GCP_DEV_SERVICE_ACCOUNT_EMAIL` - GCP service account email for development
- `GCP_DEV_WORKLOAD_IDENTITY_PROVIDER` - GCP workload identity provider for development
- `GCP_DEFAULT_REGION` - GCP default region

## GCP Workload Identity Provider
We use GH Action to authenticate with GCP and run ephemeral environments. The following set of roles should be configured for the service account:
- https://cloud.google.com/run/docs/deploying-source-code#permissions_required_to_deploy
- in addition `Service Accout OpenID Connect Token Creator` should be added to authenticate GitHub Actions with GCP using service account

The service account is used in Workload Identity Provider to authenticate with GCP configured in `google-github-actions/auth@v1`. Read more details [here](https://github.com/google-github-actions/auth#setting-up-workload-identity-federation).

## GCP Artifact Registry
We use GCP Artifact Registry to store Docker images created during the Cloud Bild phase of ephemeral environments. This repository is automatically crated on the first Cloud Run execution. To reduce storage costs, remember to configure the repository cleanup policy (e.g., 3 days).