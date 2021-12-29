class LoginPage {
  constructor() {
    this.username = ".username";
    this.password = ".password";
    this.submitbutton = ".submitbutton";
    this.loginlogo = ".loginlogo";
    this.errormsg = ".modaldiv text-center > p";
  }

  async navigate() {
    await page.goto("http://localhost:3000");
    const logintest = await page.locator(this.loginlogo);
    expect(logintest).toBeVisible();
  }

  async logIn(username, password) {
    await page.fill(this.username, username);
    await page.fill(this.password, password);
    await page.click(this.submitbutton);
  }

  async loginErrorMsg(errormsg) {
    const testerrmsg = await page.locator(".modaldiv > p").innerText();
    console.log(testerrmsg);
    await expect(testerrmsg).toBe(errormsg);
  }
}
module.exports = { LoginPage };
