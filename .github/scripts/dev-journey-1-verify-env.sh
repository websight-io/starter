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

# wait until CMS is ready but no longer than 300 seconds (5 minutes)
timeout 300 bash -c 'until curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/system/health -ipv4 | grep "200"; do sleep 5; done'

curl 'http://localhost:8080/apps/websight-authentication/j_security_check' --data-raw '_charset_=UTF-8&resource=%2F&j_username=wsadmin&j_password=wsadmin' -ipv4 --cookie-jar websight.auth --retry-delay 1 --retry 10

checkPage() {
  echo "Check page $1"
  if curl -s -o /dev/null -w "%{http_code}" $1 -ipv4 --cookie websight.auth | grep '200'; then 
    echo "Page $1 is available"
      if curl $1 -ipv4 --cookie websight.auth | grep 'Resource dumped by HtmlRenderer'; then 
        echo "Dumped resource found on $1"
        exit 1
      fi
  else
    echo "Page $1 is not available"
    exit 1
  fi
}

checkPage 'http://localhost:8080/content/luna/pages/Homepage.html'
checkPage 'http://localhost:8080/content/luna/pages/Products.html'
checkPage 'http://localhost:8080/content/luna/pages/Catalog.html'
checkPage 'http://localhost:8080/content/luna/pages/About-Us.html'