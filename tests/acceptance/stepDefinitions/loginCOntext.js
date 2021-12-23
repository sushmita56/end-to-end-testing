const { Given, When, Then } = require("@cucumber/cucumber");

Given('the user has browsed to the login page', async function () {
  // Write code here that turns the phrase above into concrete actions
  await page.goto("http://localhost:3000")
  const logintest = await page.locator(".loginlogo");
  console.log(logintest)
  expect(logintest).toBeVisible();
});

When('the user logs in with username {string} and password {string} using the webUI', async function (username, password) {
  // Write code here that turns the phrase above into concrete actions
  await page.fill('.username', username)
  await page.fill('.password', password)
  await page.click('.submitbutton')
});

Then('the user should be on the homepage', async function () {
  // Write code here that turns the phrase above into concrete actions
  const testhomepage = await page.locator('.registerButton');
  console.log(testhomepage)
  await expect(testhomepage).toBeVisible();
});

Then('the error message {string} should be displayed on the webUI', async function (errormsg) {
  // Write code here that turns the phrase above into concrete actions
  const testerrmsg = await page.locator('.modaldiv > p').innerText();
  console.log(testerrmsg);
  await expect(testerrmsg).toBe(errormsg);
});



