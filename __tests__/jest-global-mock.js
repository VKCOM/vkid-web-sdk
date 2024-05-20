/**
 * Mock crypto funcs
 */

jest.mock('crypto-js/sha256', () => ({
  __esModule: true,
  ...jest.requireActual('crypto-js/sha256'),
  default: () => 'SHA256-STRING',
}));

jest.mock('crypto-js/enc-base64', () => ({
  __esModule: true,
  ...jest.requireActual('crypto-js/enc-base64'),
  default: { stringify: (str) => `stringified_${str}` },
}));

jest.mock('nanoid/non-secure', () => ({
  nanoid: () => 'nanoid',
  customAlphabet: (data, length) => () => `abc`
}));

/**
 * mock ENV
 */
const isProduction = process.env.NODE_ENV === 'production';
const { version } = require('../package.json');
const { nanoid } = require('nanoid/non-secure');
window.env = {
  PRODUCTION: isProduction,
  VERSION: JSON.stringify(version),
  DOMAIN: JSON.stringify('vk.com'),
};

/**
 * Mock fetch
 */

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve(),
}));

jest.mock('#/utils/request', () => ({
  request: jest.fn().mockReturnValue(Promise.resolve()),
  getStatsUrl: (value) => value,
}));
