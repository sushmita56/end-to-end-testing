const { Given, When, Then } = require("@cucumber/cucumber");
const { EditStudentDetails } = require("../pageObjects/EditStudentDetails");

const editPage = new EditStudentDetails();

When("the user clicks edit button", async function () {
  await page.click(".edit");
});

Then("student details update page should be visible", async function () {
  const updatePageLocator = await page.locator(".register-heading");
  await expect(updatePageLocator).toBeVisible();
});

Then("the user edits and save student details", async function (dataTable) {
  const data = dataTable.rowsHash();
  await editPage.editStudents(data);
});

Then(
  'success message "{string}" should be displayed',
  async function (message) {
    await editPage.updateSuccessMessage(message);
  }
);
