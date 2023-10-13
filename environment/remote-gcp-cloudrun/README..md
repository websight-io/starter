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

and login with credentials `wsadmin`/`wsadmin`.


JIT topic:
> Running WebSight CMS on GCP Cloud Run for free (live demo)

Speakers: 
@Tomasz Michalak, @Maciej Laskowski

Time: Today, 14:00