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

/**
 * mock ENV
 */
const isProduction = process.env.NODE_ENV === 'production';
const { version } = require('../package.json');
window.env = {
  PRODUCTION: isProduction,
  VERSION: JSON.stringify(version),
  DOMAIN: JSON.stringify('vk.com'),
};
