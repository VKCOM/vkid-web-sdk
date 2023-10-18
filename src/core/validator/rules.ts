import { ValidatorRule } from './types';

export const isRequired: ValidatorRule = (param: any) => {
  let result = true;

  if (typeof param === 'string' && param.trim() === '' || param === undefined || param == null) {
    result = false;
  }

  return {
    result,
    makeError: (valueName: string) => `${valueName} is required parameter`,
  };
};
export const isNumber: ValidatorRule = (param: any) => {
  return {
    result:
      ['number', 'string'].includes(typeof param) && !isNaN(parseInt(param)),
    makeError: (valueName: string) => `${valueName} should be number`,
  };
};
export const isValidAppId: ValidatorRule = (param: any) => {
  return {
    result: param === undefined || isNumber(param).result && param > 0,
    makeError: (valueName: string) => `${valueName} is not a valid app id`,
  };
};
export const isValidHeight: ValidatorRule = (param: any) => {
  let result =
    param !== undefined &&
    param.height !== undefined &&
    isNumber(param.height) &&
    param.height < 57 &&
    param.height > 31
   || (param === undefined || param.height === undefined);

  return {
    result,
    makeError: () => 'The height should correspond to the range from 32 to 56',
  };
};
