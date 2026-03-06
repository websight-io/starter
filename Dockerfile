# Copyright (c) 2023 Dynamic Solutions sp. z o.o. sp. k.
# 
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at

#     http://www.apache.org/licenses/LICENSE-2.0

# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# Use the CMS builder image with cached .m2 repo to create a build artifact.
FROM europe-west1-docker.pkg.dev/websight-io/websight-docker-releases/websight-cms-builder:1.25.0 AS builder

# Copy local code to the container image.
WORKDIR /app
COPY pom.xml .
COPY .mvn ./.mvn
COPY applications ./applications
COPY content ./content
COPY distribution ./distribution
COPY tests ./tests

# Build a release artifact.
RUN mvn package -DskipTests -Drat.skip=true

FROM registry.access.redhat.com/ubi9/openjdk-17:1.23

EXPOSE 8080

VOLUME /websight/launcher/repository

USER root
RUN mkdir /websight && \
    mkdir /websight/org.apache.sling.feature.launcher && \
    mkdir /websight/launcher && \
    mkdir /websight/artifacts && \
    mkdir /var/websight
USER 185

COPY --chown=185 --from=builder /app/distribution/src/main/container/bin /websight/bin
COPY --chown=185 --from=builder /app/distribution/target/dependency/org.apache.sling.feature.launcher /websight/org.apache.sling.feature.launcher
COPY --chown=185 --from=builder /app/distribution/target/artifacts/ /websight/artifacts/
RUN ["chmod", "+x", "/websight/bin/launch.sh"]

HEALTHCHECK --interval=15s --timeout=3s --start-period=5s CMD curl --fail http://localhost:8080/system/health || exit 1

WORKDIR /websight
ENTRYPOINT [ "/websight/bin/launch.sh" ]
CMD ["tar"]