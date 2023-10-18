export type ValidatorRule = (...args: any[]) => {
  result: boolean;
  makeError: (name: string) => string;
};
