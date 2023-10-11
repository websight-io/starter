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

./mvnw -f ./tests/content/pom.xml clean install -P autoInstallPackage
if npm run-script test --prefix tests/end-to-end | grep "1 of [0-9]* failed"; then
  echo "Project changes detected"
else
  echo "Project changes not detected"
  exit 1  
fi