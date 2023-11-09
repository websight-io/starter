#!/bin/bash

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

# fail fast
set -e

BRANCH_NAME=${1}

# Cloud Run environment must be compatible with RFC 1123 Label Names https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#dns-label-names
# It should cosists of only lowercase, digits, and hyphens; must begin with letter, and may not end with hyphen; must be less than 64 characters.
ENV_NAME=$(echo websight-cms-${BRANCH_NAME} | sed 's/[^a-zA-Z0-9]/-/g' | cut -c 1-63)
ENV_NAME=$(echo ${ENV_NAME} | tr '[:upper:]' '[:lower:]')

if [[ "$ENV_NAME" == *- ]]
then
  ENV_NAME=$(echo ${ENV_NAME} | cut -c 1-62)
  echo "${ENV_NAME}0"
else
  echo "${ENV_NAME}"
fi