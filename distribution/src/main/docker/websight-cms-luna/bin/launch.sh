#!/bin/bash -e

# Copyright (C) 2022 Dynamic Solutions
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

JAVA_OPTS=""
CACHE_DIR=cache

setupDebugOptions() {
    if [ "x${WS_DEBUG}" != "x" ]; then
        if [ "x${JAVA_DEBUG_OPTS}" = "x" ]; then
            JAVA_DEBUG_OPTS="${DEFAULT_JAVA_DEBUG_OPTS}"
        fi

        JAVA_OPTS="${JAVA_DEBUG_OPTS} ${JAVA_OPTS}"
        echo "Enabling Java debug options: ${JAVA_DEBUG_OPTS}"
    fi
}

setupDefaults() {
    DEFAULT_JAVA_OPTS="-XX:+UnlockDiagnosticVMOptions "

    DEFAULT_JAVA_DEBUG_PORT="5005"
    if [ "x${JAVA_DEBUG_PORT}" = "x" ]; then
        JAVA_DEBUG_PORT="${DEFAULT_JAVA_DEBUG_PORT}"
    fi
    DEFAULT_JAVA_DEBUG_OPTS="-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:${JAVA_DEBUG_PORT}"

    if [ "x${JAVA_OPTS}" = "x" ]; then
        JAVA_OPTS="${DEFAULT_JAVA_OPTS}"
    fi

    if [ "x${EXTRA_JAVA_OPTS}" != "x" ]; then
        JAVA_OPTS="${JAVA_OPTS} ${EXTRA_JAVA_OPTS}"
    fi
}

feature_name="${1}"
feature=$(find ${CACHE_DIR} -name "*${feature_name}*.slingosgifeature")

if [[ ! -f "${feature}" ]]; then
    echo "[ERROR] Did not find any feature file matching name ${feature_name}. Aborting"
    exit 1
fi

echo "[INFO] Selected ${feature} for launching"

feature="${feature}"

setupDefaults
setupDebugOptions

# remove add-opens after SLING-10831 is fixed
exec java \
    --add-opens java.base/java.lang=ALL-UNNAMED \
    ${JAVA_OPTS} \
    -jar org.apache.sling.feature.launcher.jar \
    -c ${CACHE_DIR} \
    -CC "org.apache.sling.commons.log.LogManager=MERGE_LATEST" \
    -p . \
    -f ${feature}
