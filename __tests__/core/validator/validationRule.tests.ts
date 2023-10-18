import { isRequired, isNumber, isValidAppId, isValidHeight } from '#/core/validator';

describe('isNumber rule', () => {
  it('should return true', () => {
    expect(isNumber(1).result).toBeTruthy();
    expect(isNumber(12345).result).toBeTruthy();
    expect(isNumber(-200).result).toBeTruthy();
    expect(isNumber(0).result).toBeTruthy();
    expect(isNumber(1.1).result).toBeTruthy();
    expect(isNumber('123').result).toBeTruthy();
  });

  it('should return false', () => {
    expect(isNumber(undefined).result).toBeFalsy();
    expect(isNumber(null).result).toBeFalsy();
    expect(isNumber(false).result).toBeFalsy();
    expect(isNumber({ '12': 24 }).result).toBeFalsy();
    expect(isNumber([12, 33, 86]).result).toBeFalsy();
  });
});

describe('isRequired rule', () => {
  it('should return true', () => {
    expect(isRequired(1).result).toBeTruthy();
    expect(isRequired('12345').result).toBeTruthy();
    expect(isRequired(true).result).toBeTruthy();
    expect(isRequired([8, 0, 9, 53]).result).toBeTruthy();
    expect(isRequired({ what: true, time: '15:00' }).result).toBeTruthy();
  });

  it('should return false', () => {
    expect(isRequired('').result).toBeFalsy();
    expect(isRequired('    ').result).toBeFalsy();
    expect(isRequired(undefined).result).toBeFalsy();
    expect(isRequired(null).result).toBeFalsy();
  });
});

describe('isValidAppId rule', () => {
  it('should return true', () => {
    expect(isValidAppId(undefined).result).toBeTruthy();
    expect(isValidAppId(1).result).toBeTruthy();
    expect(isValidAppId('12345').result).toBeTruthy();
  });

  it('should return false', () => {
    expect(isValidAppId({ what: true, time: '15:00' }).result).toBeFalsy();
    expect(isValidAppId([8, 0, 9, 53]).result).toBeFalsy();
    expect(isValidAppId(true).result).toBeFalsy();
    expect(isValidAppId('').result).toBeFalsy();
    expect(isValidAppId(null).result).toBeFalsy();
  });
});

describe('isValidHeight rule', () => {
  it('should return true', () => {
    expect(isValidHeight(undefined).result).toBeTruthy();
    expect(isValidHeight({}).result).toBeTruthy();
    expect(isValidHeight({ height: 32 }).result).toBeTruthy();
    expect(isValidHeight({ height: 56 }).result).toBeTruthy();
  });

  it('should return false', () => {
    expect(isValidHeight({ height: '31' }).result).toBeFalsy();
    expect(isValidHeight({ height: 31 }).result).toBeFalsy();
    expect(isValidHeight({ height: 57 }).result).toBeFalsy();
  });
});
