const { Given, When, Then } = require("@cucumber/cucumber");

When("the user adds student with following details", async (dataTable) => {
  const data = dataTable.rowsHash();

  await page.click(".registerButton");
  await page.fill(".name-input", data.name);
  await page.fill(".email-input", data.email);
  await page.fill(".address-input", data.address);
  await page.fill(".phone-input", data.phone);
  await page.fill(".marks-input", data.gpa);

  const qualiOptions = {
    "+2": "#react-select-3-option-0",
    bachelors: "#react-select-3-option-1",
    masters: "#react-select-3-option-2",
  };

  const destOptions = {
    australia: "#react-select-5-option-0",
    usa: "#react-select-5-option-1",
    canada: "#react-select-5-option-2",
    japan: "#react-select-5-option-3",
  };

  const ieltsOptions = {
    no: "#react-select-7-option-0",
    yes: "#react-select-7-option-1",
  };

  const availableQuals = Object.keys(qualiOptions);
  console.log(availableQuals);
  if (!availableQuals.includes(data.qualification)) {
    throw new Error(
      `Invalid qualification option provided. \nAvailable options:\n${availableQuals.join(
        ","
      )}`
    );
  }

  const availableDest = Object.keys(destOptions);
  console.log(availableDest);
  if (!availableDest.includes(data.destination)) {
    throw new Error(
      `Invalid destination option provided. \n Available OPtiions are: \n${availableDest.join(
        ","
      )}`
    );
  }

  const availableIelts = Object.keys(ieltsOptions);
  console.log(availableIelts);
  if (!availableIelts.includes(data.ielts)) {
    throw new Error(
      `Invalid option provided. \n Available options are: \n${availableIelts.join(
        ","
      )}`
    );
  }

  const qualificationdd = await page.$(".css-319lph-ValueContainer");
  await qualificationdd.click();
  const qualLocator = await page.locator(
    `.css-4ljt47-MenuList > ${qualiOptions[data.qualification]}`
  );
  await qualLocator.click();
  // page.pause();

  const destinationdd = await page.$(".destination-selector");
  await destinationdd.click();
  const destLocator = await page.locator(
    `.css-4ljt47-MenuList > ${destOptions[data.destination]}`
  );
  await destLocator.click();

  const ieltsdd = await page.$(".ieltsband-selector");
  await ieltsdd.click();
  const ieltsLocator = await page.locator(
    `.css-4ljt47-MenuList > ${ieltsOptions[data.ielts]}`
  );
  await ieltsLocator.click();

  if (data.ielts === "yes") {
    if (data.listening) await page.fill(".listening-input", data.listening);
    if (data.reading) await page.fill(".reading-input", data.reading);
    if (data.listening) await page.fill(".writing-input", data.writing);
    if (data.writing) await page.fill(".speaking-input", data.speaking);
    if (data.overallBand) await page.fill(".overallband-input", data.overallBand);
  }

  await page.click(".register-Button");
});

Then("ielts band form should not be visible", async function () {
  const ieltsPage = await page.locator(
    "//div[@class = 'ielts-score-div']/div[@class = 'ielts-input-div']/p"
  );
  await expect(ieltsPage).not.toBeVisible();
});

Then(
  "success message {string} should be displayed",
  async function (successmessage) {
    // Write code here that turns the phrase above into concrete actions
    const testmessage = await page.locator(".modaldiv > p").innerText();
    successmessage = `"${successmessage}"`;
    console.log(testmessage);
    await expect(testmessage).toBe(successmessage);
  }
);

//  p[text() = 'Please enter your ielts score']"
