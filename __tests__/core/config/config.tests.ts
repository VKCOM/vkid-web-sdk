import { Config } from '#/core/config';

describe('Config', () => {
  beforeEach(() => {
    reporter
      .addLabel('layer', 'unit')
      .feature('Units')
      .addLabel('Platform', 'Web')
      .addLabel('Product', 'VK ID SDK')
      .addLabel('Component', 'Config')
      .addLabel('Suite', 'Units');
  });
  it('Should get default properties', () => {
    const config = new Config();

    expect(config.get()).toBeTruthy();

    expect(config.get().__loginDomain).toContain('login.');
    expect(config.get().__oauthDomain).toContain('oauth.');
    expect(config.get().__vkidDomain).toContain('id.');
    expect(config.get().app).toBe(0);
  });

  it('Should override properties', () => {
    const config = new Config();
    const OVERRIDE_STRING = 'Ryoji';

    config.set({
      app: 100,
      state: OVERRIDE_STRING,
      redirectUrl: OVERRIDE_STRING,
      __loginDomain: OVERRIDE_STRING,
      __oauthDomain: OVERRIDE_STRING,
      __vkidDomain: OVERRIDE_STRING,
    });

    expect(config.get()).toBeTruthy();
    expect(config.get().app).toBe(100);
    expect(config.get().state).toBe(OVERRIDE_STRING);
    expect(config.get().redirectUrl).toBe(OVERRIDE_STRING);
    expect(config.get().__loginDomain).toBe(OVERRIDE_STRING);
    expect(config.get().__oauthDomain).toBe(OVERRIDE_STRING);
    expect(config.get().__vkidDomain).toBe(OVERRIDE_STRING);
  });
});
