import mitt, { Emitter } from 'mitt';

export class Dispatcher {
  protected readonly events: Emitter = mitt();

  public on(event: string, handler: any): this {
    this.events.on(event, handler);
    return this;
  }

  public off(event: string, handler: any): this {
    this.events.off(event, handler);
    return this;
  }
}
