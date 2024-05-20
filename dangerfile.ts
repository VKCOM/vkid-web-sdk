import { warn, message, danger } from "danger"
import * as fs from 'fs'
import { subtractObjects, makeCell } from './scripts/utilsMetrics.js'

const targetBranchName = danger.gitlab.mr.target_branch;
if (!['master', 'develop'].includes(targetBranchName)) {
  process.exit(0);
}

const TARGET_METRICS_PATH = `.health-metrics/${targetBranchName}.json`;
const targetMetricsString = fs.readFileSync(TARGET_METRICS_PATH, 'utf-8');
const targetMetrics = JSON.parse(targetMetricsString) ||
  { build: { esm: {}, cjs: {}, umd: {} }, tests: { coverage: {} } };

const BRANCH_METRICS_PATH = '.health-metrics/branch.json';
const branchMetricsString = fs.readFileSync(BRANCH_METRICS_PATH, 'utf-8');
const branchMetrics = JSON.parse(branchMetricsString);

const diffMetrics = subtractObjects(branchMetrics, targetMetrics);

const { coverage: branchCoverage, time: branchTime, passed: branchPassed, total: branchTotal, failed: branchFailed, skipped: branchSkipped } = branchMetrics.tests;
const { coverage: targetCoverage, time: targetTime, passed: targetPassed, total: targetTotal, failed: targetFailed, skipped: targetSkipped } = targetMetrics.tests;
const { coverage: diffCoverage, time: diffTime, passed: diffPassed, total: diffTotal, failed: diffFailed, skipped: diffSkipped } = diffMetrics.tests;

// Docs edited start
const documentation = danger.git.fileMatch("docs/**/*");
if (documentation.edited) {
  warn("Публичный интерфейс был изменен!");
}
// Docs edited end

// Jest coverage start
const coverageMessage = `
Code Coverage
| Lines | Statements | Functions |
| ------ | ------ | ------ |
`
  + makeCell(branchCoverage.lines, targetCoverage.lines, diffCoverage.lines, '%')
  + makeCell(branchCoverage.statements, targetCoverage.statements, diffCoverage.statements, '%')
  + makeCell(branchCoverage.functions, targetCoverage.functions, diffCoverage.functions, '%') + '|';
message(coverageMessage);
// Jest coverage end

// Jest tests start
const testsStatusMessage = `
Unit Tests Status
| Time | Passed | Failed | Skipped | Total |
| ------ | ------ | ------ | ------ | ------ |
`
  + makeCell(branchTime, targetTime, diffTime, 's', true)
  + makeCell(branchPassed, targetPassed, diffPassed)
  + makeCell(branchFailed, targetFailed, diffFailed)
  + makeCell(branchSkipped, targetSkipped, diffSkipped)
  + makeCell(branchTotal, targetTotal, diffTotal) + '|';
message(testsStatusMessage);
// Jest tests end

// Build log start
const { esm: { time: esmBranchTime, size: esmBranchSize }, cjs: { time: cjsBranchTime, size: cjsBranchSize }, umd: { time: umdBranchTime, size: umdBranchSize } } = branchMetrics.build;
const { esm: { time: esmTargetTime, size: esmTargetSize }, cjs: { time: cjsTargetTime, size: cjsTargetSize }, umd: { time: umdTargetTime, size: umdTargetSize } } = targetMetrics.build;
const { esm: { time: esmDiffTime, size: esmDiffSize }, cjs: { time: cjsDiffTime, size: cjsDiffSize }, umd: { time: umdDiffTime, size: umdDiffSize } } = diffMetrics.build;

const buildMessage = `
Build Status
| | esm | cjs | umd |
| ------ | ------ | ------ | ------ |
| Size `
  + makeCell(esmBranchSize, esmTargetSize, esmDiffSize, 'b', true)
  + makeCell(cjsBranchSize, cjsTargetSize, cjsDiffSize, 'b', true)
  + makeCell(umdBranchSize, umdTargetSize, umdDiffSize, 'b', true) + `
| Time `
  + makeCell(esmBranchTime, esmTargetTime, esmDiffTime, 'ms', true)
  + makeCell(cjsBranchTime, cjsTargetTime, cjsDiffTime, 'ms', true)
  + makeCell(umdBranchTime, umdTargetTime, umdDiffTime, 'ms', true)
message(buildMessage);
// Build log end
