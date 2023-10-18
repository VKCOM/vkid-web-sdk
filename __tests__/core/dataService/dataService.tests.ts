import { DataService } from '#/core/dataService';

describe('DataService', () => {
  test('Must return data on successful completion', async () => {
    const dataService = new DataService();
    const successData = 'success';
    dataService.sendSuccess(successData);

    const data = await dataService.value;
    expect(data).toBe(successData);
  });

  test('Must return error data', async () => {
    const dataService = new DataService();
    const errorData = 'error';
    dataService.sendError(errorData);

    try {
      await dataService.value;
    } catch (e) {
      expect(e).toBe(errorData);
    }
  });

  test('Must return data on successful completion and execute a callback', async () => {
    const dataService = new DataService();
    const successData = 'success';
    const callback = jest.fn();
    dataService.setCallback(callback);
    dataService.sendSuccess(successData);

    const data = await dataService.value;
    expect(data).toBe(successData);
    expect(callback).toBeCalled();
  });

  test('Must return error data and execute a callback', async () => {
    const dataService = new DataService();
    const errorData = 'error';
    const callback = jest.fn();
    dataService.setCallback(callback);
    dataService.sendError(errorData);

    try {
      await dataService.value;
    } catch (e) {
      expect(e).toBe(errorData);
      expect(callback).toBeCalled();
    }
  });
});
