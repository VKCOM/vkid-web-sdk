export class DataService<Res, Rej> {
  private readonly promise: Promise<Res>;
  private callback?: VoidFunction | null;
  private resolve: (value: Res) => void;
  private reject: (value: Rej) => void;

  public constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }

  public readonly setCallback = (callback: VoidFunction): void => {
    this.callback = callback;
  }

  public readonly removeCallback = (): void => {
    this.callback = null;
  }

  public readonly sendSuccess = (value: Res): void => {
    this.resolve(value);
    this.callback && this.callback();
  }

  public readonly sendError = (value: Rej): void => {
    this.reject(value);
    this.callback && this.callback();
  }

  public get value() {
    return this.promise;
  }
}
