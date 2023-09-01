#!/usr/bin/bash

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

# exits with error code if there are fails in the Backstop CI report file
# exit 1 - no errors detected
# exit 0 - some errors detected

# config
BASEDIR=$(dirname "$0")
NODEDIR="$BASEDIR"/../../../../tests/end-to-end
BACKSTOPDIR="$NODEDIR"/backstop_data

# read report
BACKSTOP_FAILS=$(sed -n 's/.*failures="\([0-9]*\)".*/\1/p' "${BACKSTOPDIR}/ci_report/xunit.xml");

# result
if ((BACKSTOP_FAILS > 0)); then
  echo "ERROR | Backstop CI report contains failed test cases"
  exit 0;
else
  echo "OK | Backstop CI report contains 0 failed test cases"
  exit 1; # use to break execution of next scripts in chain
fi
