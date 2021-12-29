const { Given, When, Then } = require("@cucumber/cucumber");
const { HomePage } = require("../pageObjects/HomePage");
const { LoginPage } = require("../pageObjects/LoginPage");

const loginObj = new LoginPage();
const homePage = new HomePage();

Given("the user has browsed to the login page", async function () {
  // await page.goto("http://localhost:3000");
  // const logintest = await page.locator(".loginlogo");
  // console.log(logintest);
  // expect(logintest).toBeVisible();
  await loginObj.navigate();
});

Given(
  "the user has logged in with username {string} and password {string}",
  async function (username, password) {
    await loginObj.logIn(username, password);
    await homePage.userShouldBeOnHomePage();
  }
);

When(
  "the user logs in with username {string} and password {string} using the webUI",
  async function (username, password) {
    //   await page.fill(".username", username);
    //   await page.fill(".password", password);
    //   await page.click(".submitbutton");
    await loginObj.logIn(username, password);
  }
);

Then("the user should be on the homepage", async function () {
  await homePage.userShouldBeOnHomePage();
});

Then(
  "the error message {string} should be displayed on the webUI",
  async function (errormsg) {
    // const testerrmsg = await page.locator(".modaldiv > p").innerText();
    // console.log(testerrmsg);
    // await expect(testerrmsg).toBe(errormsg);
    await loginObj.loginErrorMsg(errormsg);
  }
);
