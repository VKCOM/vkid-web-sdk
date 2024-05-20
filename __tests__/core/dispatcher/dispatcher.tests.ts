import { Dispatcher } from '#/core/dispatcher';

class TestDispatcher extends Dispatcher {
  public emit(event: string, data: any): void {
    this.events.emit(event, data);
  }
}

describe('Dispatcher', () => {
  let instance: TestDispatcher;

  beforeEach(() => {
    instance = new TestDispatcher();
    reporter
      .addLabel('layer', 'unit')
      .feature('Units')
      .addLabel('Platform', 'Web')
      .addLabel('Product', 'VK ID SDK')
      .addLabel('Component', 'Dispatcher')
      .addLabel('Suite', 'Units')
      .addLabel('Project', 'VKIDSDK');
  });

  it('should register event handler with on() method', () => {
    const event = 'myEvent';
    const handler = jest.fn();

    const spyOnEventsOn = jest.spyOn(instance, 'on');
    instance.on(event, handler);

    expect(spyOnEventsOn).toHaveBeenCalledWith(event, handler);
  });

  it('should unregister event handler with off() method', () => {
    const event = 'myEvent';
    const handler = jest.fn();

    const spyOnEventsOff = jest.spyOn(instance, 'off');
    instance.off(event, handler);

    expect(spyOnEventsOff).toHaveBeenCalledWith(event, handler);
  });

  it('should return the instance of Dispatcher from on() method', () => {
    const event = 'myEvent';
    const handler = jest.fn();

    const result = instance.on(event, handler);

    expect(result).toBe(instance);
  });

  it('should return the instance of Dispatcher from off() method', () => {
    const event = 'myEvent';
    const handler = jest.fn();

    const result = instance.off(event, handler);

    expect(result).toBe(instance);
  });

  it('should send and handle event', async () => {
    const event = 'myEvent';
    const eventData = 'someData';

    const eventHandledPromise = new Promise<void>((resolve) => {
      instance.on(event, (data: any) => {
        expect(data).toBe(eventData);
        resolve();
      });
    });

    instance.emit(event, eventData);

    await eventHandledPromise;
  });
});
