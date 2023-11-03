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

PREVIOUS_JOB_ID=$(jq -r '.id' <<< "$WORKFLOW_RUN_EVENT_OBJ")
echo "Previous Job ID: $PREVIOUS_JOB_ID"
echo "PREVIOUS_JOB_ID=$PREVIOUS_JOB_ID" >> "$GITHUB_ENV"

SUITE_ID=$(jq -r '.check_suite_id' <<< "$WORKFLOW_RUN_EVENT_OBJ")
echo "Previous Suite ID: $SUITE_ID"
echo "SUITE_ID=$SUITE_ID" >> "$GITHUB_ENV"

ARTIFACT_ID=$(gh api "/repos/$OWNER/$REPO/actions/artifacts" \
  --jq ".artifacts.[] |
  select(.name==\"visual-tests-report\") |
  select(.workflow_run.id==${PREVIOUS_JOB_ID}) |
  select(.expired==false) |
  .id")

echo "Artifact ID: $ARTIFACT_ID"
echo "ARTIFACT_ID=$ARTIFACT_ID" >> "$GITHUB_ENV"

PR_NUMBER=$(jq -r '.pull_requests[0].number' \
  <<< "$WORKFLOW_RUN_EVENT_OBJ")

echo "Pull request Number: $PR_NUMBER"
echo "PR_NUMBER=$PR_NUMBER" >> "$GITHUB_ENV"

HEAD_SHA=$(jq -r '.pull_requests[0].head.sha' \
  <<< "$WORKFLOW_RUN_EVENT_OBJ")

echo "Head SHA: $HEAD_SHA"
echo "HEAD_SHA=$HEAD_SHA" >> "$GITHUB_ENV"
