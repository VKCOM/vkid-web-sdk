import { Config } from '#/core/config';

describe('Config', () => {
  it('Should get default properties', () => {
    const config = new Config();

    expect(config.get()).toBeTruthy();

    expect(config.get().loginDomain).toContain('login.');
    expect(config.get().oauthDomain).toContain('oauth.');
    expect(config.get().vkidDomain).toContain('id.');
    expect(config.get().app).toBe(0);
  });

  it('Should override properties', () => {
    const config = new Config();
    const OVERRIDE_STRING = 'Ryoji';

    config.set({
      app: 100,
      loginDomain: OVERRIDE_STRING,
      oauthDomain: OVERRIDE_STRING,
      vkidDomain: OVERRIDE_STRING,
    });

    expect(config.get()).toBeTruthy();
    expect(config.get().app).toBe(100);
    expect(config.get().loginDomain).toBe(OVERRIDE_STRING);
    expect(config.get().oauthDomain).toBe(OVERRIDE_STRING);
    expect(config.get().vkidDomain).toBe(OVERRIDE_STRING);
  });
});
