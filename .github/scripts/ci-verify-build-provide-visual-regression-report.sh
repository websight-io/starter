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

# Copies only required files as report to:
# 1. use less space by copying just what is needed
# 2. use easier artifact path in CI artifact config so downloaded report is not few directories "deep"
# 3. copy only explicitly i.e. to prevent copy of potentially confident auth tokens from "engine_scripts"

# config
BASEDIR=$(dirname "$0")
PWD=$(pwd)
NODEDIR="$BASEDIR"/../../../../tests/end-to-end
BACKSTOPDIR="$NODEDIR"/backstop_data
TEMP="${PWD}/artifacts-temp/visual"
TARGET="${PWD}/artifacts/visual"
PNGQUANT_ARGS=(--ext .png --force --speed=10 --quality=0-100)
XARGS_ARGS=(-0 -P 4 -I)

echo "$(date +"%T") | prepare target directory"
mkdir -p "$TEMP"
mkdir -p "$TARGET"

echo "$(date +"%T") | copy directories to target directory"
cp -R "$BACKSTOPDIR"/bitmaps_reference "$TEMP"/bitmaps_reference
cp -R "$BACKSTOPDIR"/bitmaps_test "$TEMP"/bitmaps_test
cp -R "$BACKSTOPDIR"/html_report "$TEMP"/html_report
cp -R "$BACKSTOPDIR"/readme "$TEMP"/readme

echo "$(date +"%T") | copy files to target directory"
cp "$BACKSTOPDIR"/open-report.sh "$TEMP"/open-report.sh
cp "$BACKSTOPDIR"/README.md "$TEMP"/README.md

# run PNG compression
echo "$(date +"%T") | run PNG compression - bitmaps_reference"
find "$TEMP"/bitmaps_reference/ -name "*.png" -print0 | xargs "${XARGS_ARGS[@]}" {} pngquant "${PNGQUANT_ARGS[@]}" {}

echo "$(date +"%T") | run PNG compression - bitmaps_test"
find "$TEMP"/bitmaps_test/ -name "*.png" -print0 | xargs "${XARGS_ARGS[@]}" {} pngquant "${PNGQUANT_ARGS[@]}" {}

# Note the double zip: https://github.com/actions/upload-artifact/issues/39
echo "$(date +"%T") | speed up GitHub artifacts upload by using 1 big file"
cd "$TEMP" && zip -rX "${TARGET}/artifacts-visual.zip" ./*

echo "$(date +"%T") | cleanup"
echo "$TARGET"
ls -la "$TARGET"

echo "$(date +"%T") | done"
