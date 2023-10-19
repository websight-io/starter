# Workflow Documentation

## Environment Variables
The following environment variables are required to run this project:
- `GCP_DEV_PROJECT_ID` - GCP project ID for development
- `GCP_DEV_SERVICE_ACCOUNT_EMAIL` - GCP service account email for development
- `GCP_DEV_IMAGE_REGISTRY_URI` - GCP image registry uri for development (region specific)
- `GCP_DEV_WORKLOAD_IDENTITY_PROVIDER` - GCP workload identity provider for development
- `GCP_DEFAULT_REGION` - GCP default region

## GCP Workload Identity Provider
We use GH Action to authenticate with GCP. To do so, we need to create a GCP service account and assign it the following roles:
- `Artifact Registry Writer` - to push Docker images to GCP Artifact Registry
- `Cloud Run Admin` - to deploy Docker images to GCP Cloud Run
- `Service Account User` - to run Cloud Run service as a service account
- `Service Accout OpenID Connect Token Creator` - to authenticate with GCP using service account

The service account is used in Workload Identity Provider to authenticate with GCP configured in `google-github-actions/auth@v1`. Read more details [here](https://github.com/google-github-actions/auth#setting-up-workload-identity-federation).

## GCP Artifact Registry
We use GCP Artifact Registry to store Docker images. To do so, create a GCP Artifact Registry repository with `cms-starter` name and `docker` format. Read more details [here](https://cloud.google.com/artifact-registry/docs/docker/quickstart). The full registry name is combined from `${{ vars.GCP_DEV_IMAGE_REGISTRY_URI }}/${{ vars.GCP_DEV_PROJECT_ID }}/cms-starter`. To reduce storage costs, remember to configure the repository cleanup policy (e.g., 3 days).