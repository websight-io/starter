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

# authenticate
curl 'http://localhost:8080/apps/websight-authentication/j_security_check' --data-raw '_charset_=UTF-8&resource=%2F&j_username=customAdmin&j_password=customPassword' -ipv4 --cookie-jar websight.auth --retry-delay 1 --retry 10

# publish Luna Homepage
curl -X POST "http://localhost:8080/content/luna/pages.websight-pages-space-service.publish-pages.action" \
  -H "accept: application/json" -H "Content-Type: multipart/form-data" -F "items=Homepage" \
  --cookie websight.auth

# check that Luna Homepage is published
curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/published/luna/pages/Homepage.html -ipv4 | grep "200"
