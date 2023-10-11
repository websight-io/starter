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

# workaround MacOS issue with sed
if [[ "$OSTYPE" == "darwin"* ]]; then
  echo "MacOS detected"
  sed() {
    gsed "$@"
  }
fi

echo "Update LunaTitleComponent.java"
sed -i '/^package pl.ds.luna.components.models;/a\
\
import javax.inject.Inject;' ./application/backend/src/main/java/pl/ds/luna/components/models/LunaTitleComponent.java

sed -i '/^import org.apache.sling.api.resource.Resource;/a\
import org.apache.sling.models.annotations.Default;\
' ./application/backend/src/main/java/pl/ds/luna/components/models/LunaTitleComponent.java

sed -i '/^public class LunaTitleComponent extends TitleComponent {/a\
  \
  @Inject\
  @Default(values = {"hl-title__heading--size-5"})\
  private String overlineSize;\
  \
  public String getOverlineSize(){\
  return overlineSize;\
}\
  ' ./application/backend/src/main/java/pl/ds/luna/components/models/LunaTitleComponent.java

echo "Update title.json"

sed -i '/"headingSize": "hl-title__heading--size-1"/a\
                                  "overlineSize": "hl-title__heading--size-3",\
  ' ./application/backend/src/test/resources/title.json

echo "Update LunaTitleComponentTest.java"

sed -i '/assertThat(model.getHeadingSize()).isEqualTo("hl-title__heading--size-4");/a\
  assertThat(model.getOverlineSize()).isEqualTo("hl-title__heading--size-5");\
  ' ./application/backend/src/test/java/pl/ds/luna/components/models/LunaTitleComponentTest.java 

sed -i '/assertThat(model.getHeadingSize()).isEqualTo("hl-title__heading--size-1");/a\
  assertThat(model.getOverlineSize()).isEqualTo("hl-title__heading--size-3");\
  ' ./application/backend/src/test/java/pl/ds/luna/components/models/LunaTitleComponentTest.java

echo "Update lunatitle.html"

sed -i 's/hl-title__heading--size-6/${model.overlineSize}/g' ./application/backend/src/main/resources/apps/luna/components/lunatitle/lunatitle.html
  
echo "Add dialog"

mkdir -p ./application/backend/src/main/resources/apps/luna/components/lunatitle/dialog

echo '{
  "tabs": {
    "generalTab": {
      "container": {
        "overlineSize": {
          "sling:resourceType": "wcm/dialogs/components/include",
          "sling:orderBefore": "overline",
          "path": "/libs/howlite/components/common/headingsize",
          "include": {
            "sling:resourceSuperType": "/libs/howlite/components/common/headingsize",
            "label": "Overline size",
            "name": "overlineSize",
            "description": "Changes font size",
            "s": {
              "selected": true
            },
            "m": {
              "selected": false
            }
          }
        }
      }
    }
  }
}' > ./application/backend/src/main/resources/apps/luna/components/lunatitle/dialog/.content.json
