#!/bin/bash

#
# Copyright (C) 2023 Dynamic Solutions
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
#

# create session and receive session cookie value
curl -s -o /dev/null -c - \
  --location --request POST "$BASE_URL_CMS/apps/websight-authentication/j_security_check" \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'j_username=wsadmin' \
  --data-urlencode 'j_password=wsadmin'
