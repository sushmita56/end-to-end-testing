const { Given, When, Then } = require("@cucumber/cucumber");
const { HomePage } = require("../pageObjects/HomePage");
const { RegisterPage } = require("../pageObjects/RegisterPage");

const registerPage = new RegisterPage();
const homePage = new HomePage();

When("the user adds student with following details", async (dataTable) => {
  const data = dataTable.rowsHash();
  await homePage.clickAddStudentButton();
  await registerPage.registerStudents(data);
});

Then("ielts band form should not be visible", async function () {
  await registerPage.isNotVisibleIeltsBlock();
});

Then(
  "success message {string} should be displayed",
  async function (successmessage) {
    await registerPage.displaySuccessMessage(successmessage);
  }
);

//  p[text() = 'Please enter your ielts score']
//div[@class = 'css-26l3qy-menu']/div[@class = ' css-4ljt47-MenuList']/div[@class=' css-9gakcf-option']
