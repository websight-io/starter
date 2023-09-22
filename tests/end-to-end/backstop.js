/*
 * Copyright (C) 2023 Dynamic Solutions
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

require('dotenv').config();

const silent = process.env.SILENT === '1';

const { baseUrlCms } = require('./src/baseUrl');

const selectors = {
  cookie_banner: '#cc--main'
};

const viewports = [
  { label: 'md-mini', width: 360, height: 480 },
  { label: 'md', width: 768, height: 1024 },
  { label: 'lg', width: 1025, height: 768 },
  { label: 'xl', width: 1216, height: 1024 },
  { label: 'mx', width: 1408, height: 900 }
];

const getPublishedPageUrl = ({ space, page }) => {
  return `${baseUrlCms}/published/${space}/pages/${page}.html`;
};

const scenarios = [
  { space: 'luna', page: 'Homepage' },
  { space: 'luna', page: 'Products' },
  { space: 'luna', page: 'About-Us' },
  { space: 'luna', page: 'Catalog' },
  { space: 'nocodeluna', page: 'Homepage' },
  { space: 'nocodeluna', page: 'Products' },
  { space: 'nocodeluna', page: 'About' },
  { space: 'nocodeluna', page: 'Catalog' },
  { space: 'lowcodeluna', page: 'Homepage' },
  { space: 'lowcodeluna', page: 'Products' },
  { space: 'lowcodeluna', page: 'About' },
  { space: 'lowcodeluna', page: 'Catalog' }
].map((scenario) => {
  const removeSelectors = ['script', 'noscript', selectors.cookie_banner];

  const scenarioConfig = {
    removeSelectors,
    label: scenario.page,
    cookiePath: 'backstop_data/engine_scripts/cookies.json',
    url: getPublishedPageUrl(scenario),
    delay: 500,
    postInteractionWait: 0,
    selectorExpansion: true,
    expect: 0,
    /*
     * sometimes page height is ~100px higher than normal,
     * the website looks correct, but footer looks like with `padding-bottom: 100px`
     * maybe that's what's left after removing `selectors.cookie_banner`?
     */
    requireSameDimensions: false
  };

  if (scenario.selectors) {
    scenarioConfig.selectors = scenario.selectors;
  }

  if (scenario.hoverSelector) {
    scenarioConfig.hoverSelector = scenario.hoverSelector;
  }

  if (scenario.viewports) {
    scenarioConfig.viewports = scenario.viewports;
  }

  return scenarioConfig;
});

const config = {
  id: 'starter',
  viewports: viewports,
  onBeforeScript: 'puppet/onBefore.js',
  onReadyScript: 'puppet/onReady.js',
  scenarios: [...scenarios],
  paths: {
    bitmaps_reference: 'backstop_data/bitmaps_reference',
    bitmaps_test: 'backstop_data/bitmaps_test',
    engine_scripts: 'backstop_data/engine_scripts',
    html_report: 'backstop_data/html_report',
    ci_report: 'backstop_data/ci_report'
  },
  report: [process.env.CI ? 'CI' : 'browser'],
  misMatchThreshold: 0.01,
  /*
   * puppeteer is headless
   * see https://github.com/garris/BackstopJS#chrome-headless-the-latest-webkit-library
   *
   * warning, changing to phantomjs consumes RAM ~1.5G + comparison may also need >0.5G
   * see https://github.com/garris/BackstopJS/issues/561#issuecomment-335194574
   */
  engine: 'puppeteer',
  engineOptions: {
    headless: 'new',
    args: ['--no-sandbox', '--headless="new"']
  },
  asyncCaptureLimit: process.env.CI ? 5 : 30,
  asyncCompareLimit: process.env.CI ? 10 : 60,
  debug: false,
  debugWindow: false
};

if (!silent) {
  console.log(JSON.stringify({ backstopJS_config: config }, null, 4));
}

module.exports = config;
