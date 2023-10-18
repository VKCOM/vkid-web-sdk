/* eslint-disable @typescript-eslint/no-extraneous-class */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { isRequired, isNumber, isValidAppId, validator } from '#/core/validator';

describe('Validator', () => {
  it('one parameter, one rule', () => {
    const correctParams = { value1: 'Langley' };
    const incorrectParams = { value1: null };

    class Class {
      @validator<any>({ value1: [isRequired] })
      public static method(user: any) {
        return user;
      }
    }

    expect(Class.method(correctParams)).toBeTruthy();
    expect(() => Class.method(incorrectParams)).toThrow(
      'value1 is required parameter',
    );
  });

  it('one parameter, two rules', () => {
    const correctParams = { value1: 2 };
    const incorrectParams = { value1: 'Ayanami' };

    class Class {
      @validator<any>({ value1: [isRequired, isNumber] })
      public static method(user: any) {
        return user;
      }
    }

    expect(Class.method(correctParams)).toBeTruthy();
    expect(() => Class.method(incorrectParams)).toThrow(
      'value1 should be number',
    );
  });

  it('two parameters, one rule', () => {
    const correctParams = { value1: 'Ikari', value2: 2 };
    const incorrectParams = { value1: 'Katsuragi', value2: {} };

    class Class {
      @validator<any>({ value1: [isRequired], value2: [isNumber] })
      public static method(user: any) {
        return user;
      }
    }

    expect(Class.method(correctParams)).toBeTruthy();
    expect(() => Class.method(incorrectParams)).toThrow(
      'value2 should be number',
    );
  });

  it('two parameters, two rules', () => {
    const correctParams = { value1: 2, value2: 2 };
    const incorrectParams = { value1: 1, value2: -1 };

    class Class {
      @validator<any>({
        value1: [isRequired, isNumber],
        value2: [isRequired, isValidAppId],
        })
      public static method(user: any) {
        return user;
      }
    }

    expect(Class.method(correctParams)).toBeTruthy();
    expect(() => Class.method(incorrectParams)).toThrow(
      'value2 is not a valid app id',
    );
  });
});
