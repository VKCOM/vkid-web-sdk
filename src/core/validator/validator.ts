import { ValidatorRule } from './types';

export const validator = <T extends Record<string, any>>(rules: {
  [key in keyof T]?: ValidatorRule[];
}): any => {
  return (
    target: any,
    propertyName: string,
    descriptor: TypedPropertyDescriptor<(...args: any[]) => any>,
  ) => {
    const originalMethod = descriptor.value;
    descriptor.value = function(params: any) {
      const rulesKeys = Object.keys(rules);
      for (let key of rulesKeys) {
        const validateHandlers = rules[key];
        validateHandlers?.forEach((handler) => {
          const { result, makeError } = handler(params[key]);
          if (!result) {
            throw new Error(makeError(key));
          }
        });
      }
      return originalMethod?.apply(this, arguments);
    };
  };
};
