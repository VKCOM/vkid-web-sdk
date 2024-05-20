const { getBuildMetrics, getTestsCoverageMetrics, getTestsRunMetrics, createDotMetricsJson } = require('./utilsMetrics.js');

let finalMetrics = { build: { esm: {}, cjs: {}, umd: {} }, tests: {} };

finalMetrics = getBuildMetrics(finalMetrics);
finalMetrics = getTestsCoverageMetrics(finalMetrics);
finalMetrics = getTestsRunMetrics(finalMetrics);

createDotMetricsJson(finalMetrics);

console.log(finalMetrics);
