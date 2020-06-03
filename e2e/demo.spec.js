describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('user should feel welcomed', async () => {
    await element(by.id("login")).tap();
    await expect(element(by.text("Welcome to React"))).toBeVisible();
  });
});
