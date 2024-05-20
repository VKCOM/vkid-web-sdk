/* eslint-disable @typescript-eslint/no-extraneous-class */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { isRequired, isNumber, isValidAppId, validator } from '#/core/validator';

describe('Validator', () => {
  beforeEach(() => {
    reporter
      .addLabel('layer', 'unit')
      .feature('Units')
      .addLabel('Platform', 'Web')
      .addLabel('Product', 'VK ID SDK')
      .addLabel('Component', 'Validator')
      .addLabel('Suite', 'Units')
      .addLabel('Project', 'VKIDSDK');
  });
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
    reporter.addLabel('id', '2248070');
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
    reporter.addLabel('id', '2248071');
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
