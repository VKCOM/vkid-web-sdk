#!/usr/bin/env node

const fs = require('fs');
const { execSync }  = require('child_process');

/**
 * Обрабатывает файл .health-metrics/build.log
 * Получает значения для форматов esm, cjs, umd:
 * - Время сборки (ms)
 * - Размер сборки (bytes)
 */
function getBuildMetrics(finalMetrics) {
  const formats = ['esm', 'cjs', 'umd'];

  const times = [];
  const sizes = [];

  const BUILD_LOG_PATH = '.health-metrics/build.log';
  const buildLogLines = fs.readFileSync(BUILD_LOG_PATH, 'utf-8').split('\n').filter(Boolean);

  buildLogLines.forEach((line) => {
    const [metric, value] = line.split(': ')
    if (metric === 'size') {
      sizes.push(value)
    } else if (metric === 'time') {
      times.push(value);
    }
  });

  for (let i = 0; i < times.length - 1; i++) {
    finalMetrics.build[formats[i]].time = times[i + 1] - times[i];
  }

  sizes.forEach((size, i) => {
    finalMetrics.build[formats[i]].size = +size;
  })

  fs.rmSync(BUILD_LOG_PATH);
  return finalMetrics;
}

/**
 * Обрабатывает файл dist-coverage/coverage-summary.json
 * Получает значения:
 * - Покрытие кода тестами: lines, statements, functions (pcts)
 */
function getTestsCoverageMetrics(finalMetrics) {
  const COVERAGE_PATH = 'dist-coverage/coverage-summary.json';

  const codeCoverageString = fs.readFileSync(COVERAGE_PATH, 'utf-8');
  const codeCoverageTotal = JSON.parse(codeCoverageString).total;

  const codeCoveragePcts = {
    lines: codeCoverageTotal.lines.pct,
    statements: codeCoverageTotal.statements.pct,
    functions: codeCoverageTotal.functions.pct,
  }

  finalMetrics.tests = { ...finalMetrics.tests, coverage: codeCoveragePcts };
  return finalMetrics;
}

/**
 * Получает название ветки, в которой был запущен скрипт
 */
function getCurrentGitBranch() {
  try {
    return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * Обрабатывает файл dist-coverage/execution.log
 * Получает значения:
 * - Время тестов (s)
 */
function getTestsRunMetrics(finalMetrics) {
  const JEST_LOG_PATH = 'dist-coverage/execution.log';

  const jestStringsMetrics = {};
  let metrics = ['Time', 'Tests'];


  const jestLogLines = fs.readFileSync(JEST_LOG_PATH, 'utf-8').split('\n').filter(Boolean);

  for (let i = jestLogLines.length - 1; i >= 0; i--) {
    if (metrics.length === 0) {
      break;
    }

    const [metric, value] = jestLogLines[i].split(': ')
    if (metrics.includes(metric)) {
      jestStringsMetrics[metric] = value.trim();
      metrics = metrics.filter((name) => name !== metric );
    }
  }

  const timeValue = +jestStringsMetrics['Time'].split('s')[0].trim();
  const jestNumberMetrics = {
    time: timeValue,
  }

  const statusesStrings = jestStringsMetrics['Tests'].split(',').map((str) => str.trim());
  statusesStrings.forEach((status) => {
    const [value, name] = status.split(' ');
    jestNumberMetrics[name] = +value;
  });

  finalMetrics.tests = { ...finalMetrics.tests, ...jestNumberMetrics };
  return finalMetrics;
}

/**
 * Создает файлы, в которых хранятся метрики.
 * Для мастера и деволопа будут .{master|develop}_metrics.json
 * Для ветки будет .branch_metrics.json
 */
function createDotMetricsJson(finalMetrics) {
  let currentBranch = getCurrentGitBranch();

  if (!['master', 'develop'].includes(currentBranch)) {
    currentBranch = 'branch';
  }

  const metricsJsonPath = `.health-metrics/${currentBranch.replace(/\//g, '_')}.json`;
  try {
    fs.writeFile(metricsJsonPath, JSON.stringify(finalMetrics), 'utf-8', (err) => { err && console.error(err); });
  } catch (error) {
    throw error;
  }
}

/**
 * Вычитает два одинаковых по структуре объекта
 * @param obj1 Объект, из которого вычитается
 * @param obj2 Объект, который вычитается
 * @returns {{}} Возвращает такой же по структуре объект, в котором будет разница между вторым и первым
 */
function subtractObjects(obj1, obj2) {
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    throw new Error('Оба аргумента должны быть объектами');
  }

  const result = {};

  for (const key in obj1) {
    if (obj1.hasOwnProperty(key)) {
      if (obj2.hasOwnProperty(key)) {
        if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
          result[key] = subtractObjects(obj1[key], obj2[key]);
        } else {
          result[key] = typeof obj1[key] === 'number' && typeof obj2[key] === 'number'
            ? +(obj1[key] - obj2[key]).toFixed(2)
            : obj1[key];
        }
      } else {
        result[key] = obj1[key];
      }
    }
  }

  return result;
}

function coloredText(number, invert = false, units = '') {
  if (number === 0) {
    return number;
  }

  const sign = number >= 0 ? '+' : '-';
  const color = ['-', '+'][+(!invert ? number >= 0 : number < 0)];
  return `[${color} ${sign}${Math.abs(number)}${units} ${color}]`
}

function makeCell(source, target, diff, units = '', inverted = false) {
  if (!source && !target) {
    return '| -'
  }
  if (!target || source === target) {
    return `| ${source}${units} `;
  }
  return `| ${target}${units}->${source}${units} (${coloredText(diff, inverted, units)}) `;
}

module.exports = {
  getBuildMetrics,
  getTestsCoverageMetrics,
  getTestsRunMetrics,
  createDotMetricsJson,

  subtractObjects,
  makeCell,
}
