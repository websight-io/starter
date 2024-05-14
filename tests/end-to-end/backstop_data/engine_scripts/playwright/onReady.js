module.exports = async (page, scenario, viewport, isReference, browserContext) => {
  console.log('SCENARIO > ' + scenario.label);
  await require('./preventLazyLoading')(page, scenario);
  await require('./clickAndHoverHelper')(page, scenario);

  // add more ready handlers here...
};
