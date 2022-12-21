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

FROM nginx

COPY src/main/docker/nginx/luna.conf /etc/nginx/conf.d/luna.conf
COPY src/main/docker/nginx/nocodeluna.conf /etc/nginx/conf.d/nocodeluna.conf
COPY src/main/docker/nginx/lowcodeluna.conf /etc/nginx/conf.d/lowcodeluna.conf
COPY src/main/docker/nginx/bulma.conf /etc/nginx/conf.d/bulma.conf
COPY src/main/docker/nginx/html/Homepage.html /usr/share/nginx/html/content/nocodeluna/pages/Homepage.html
COPY src/main/docker/nginx/html/Homepage.html /usr/share/nginx/html/content/lowcodeluna/pages/Homepage.html
COPY src/main/docker/nginx/html/Homepage.html /usr/share/nginx/html/content/luna/pages/Homepage.html
COPY src/main/docker/nginx/html/Personal.html /usr/share/nginx/html/content/bulma/pages/Personal.html