# GCP Cloud Run
Creates a development environment in [GCP Cloud Run](https://cloud.google.com/run/docs).

## Before you start

Make sure you have:
- your [GCP environment set](https://cloud.google.com/run/docs/setup)
- [DockerHub](https://hub.docker.com/) account to store CMS Docker image publicly

## Build and Push image to DockerHub

Authenticate to DockerHub:
```bash
docker login
export DOCKERHUB_USERNAME=<your dockerhub username>
```

Build and push CSM Docker image with a single command:
```bash
../../mvnw clean install -f ../../pom.xml -P dockerhub -Ddocker.hub.username=$DOCKERHUB_USERNAME
```

## Customize CMS admin password

First, create a secret with the password:
```bash
mkdir -p .secrets && echo -n "$(openssl rand -base64 12)" > .secrets/admin-password
gcloud secrets create websight-admin-password --data-file=.secrets/admin-password
```

Configure Cloud Run to access `websight-admin-password` secret following the [instructions](https://cloud.google.com/run/docs/configuring/services/secrets#access-secret).

Use the following email in the `New principal` textbox:
```bash
gcloud iam service-accounts list --format json | jq -r '.[] | select(.displayName | contains("Compute")) | .email' 
```

## Run environment
Run the service with command
```bash
envsubst < service.tmpl.yaml | gcloud run services replace --region=europe-west1 -
```
and then open the URL printed in the console (it will be not available publicly yet).

To make your environment publicly available, run the following command:
```bash
gcloud run services add-iam-policy-binding websight-cms-$DOCKERHUB_USERNAME \
    --member="allUsers" \
    --role="roles/run.invoker" \
    --region=europe-west1
```

and login with username `wsadmin` and password from `.secrets/admin-password` file.

## Clean up

To delete the environment and the secret, run the following commands:
```bash
gcloud run services delete websight-cms-$DOCKERHUB_USERNAME --region=europe-west1
gcloud secrets delete websight-admin-password
```


