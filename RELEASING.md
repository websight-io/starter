# Websight Community Edition Alpha Release

Websight Community Edition Alpha contains:
- WebSight single-container Sling OSGi Featrue Model
- Howlie application
- Luna content

The following section describes the release process for the Websight Community Edition Alpha Docker image.

You should see all the released images here: [https://gallery.ecr.aws/ds/websight-ce-alpha](https://gallery.ecr.aws/ds/websight-ce-alpha).

### Manual
> #### Prerequisites
> - Docker
> - Maven
> - Java
> - AWS CLI configured with `HowliteAdmins` group

1. Remove all locally stored WebSight snapshots by running: `rm -rf ~/.m2/repository/pl/ds`.
2. Clone the latest version of [Howlite](https://github.com/websight-io/howlite) from `main` branch. Build it by running `mvn clean install`.
3. Sign in to AWS ECR `aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/ds`
4. Clone the latest version of [Luna Project](https://github.com/websight-io/luna-project). Build from `main` branch. Build it running `mvn clean deploy -Prelease,-default`.

### Verify

`XYZ` is the tag, that was assigned to the latest release during the release. It is timestamp in a format `yyyyMMddHHmm`.

1. Remove docker image `docker rmi public.ecr.aws/ds/websight-ce-alpha:XYZ`.
2. Run `docker logout public.ecr.aws` to logout public ECR registry (to be able to pull the image).
3. Pull image `docker pull public.ecr.aws/ds/websight-ce-alpha:XYZ`.
4. Run mongo `docker run -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=mongoadmin -e MONGO_INITDB_ROOT_PASSWORD=mongoadmin mongo:4.4.6` (in different console)
5. Run container `docker run -p 8080:8080 -e MONGODB_HOST=host.docker.internal public.ecr.aws/ds/websight-ce-alpha:XYZ` (`wsadmin/wsadmin`).
