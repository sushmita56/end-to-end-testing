class HomePage {
  constructor() {
    this.registerUser = ".registerButton";
  }
  async userShouldBeOnHomePage() {
    const testHomePage = await page.locator(this.registerUser);
    console.log(testHomePage);
    await expect(testHomePage).toBeVisible();
  }

  async clickAddStudentButton() {
    await page.click(this.registerUser);
  }
}
module.exports = { HomePage };
