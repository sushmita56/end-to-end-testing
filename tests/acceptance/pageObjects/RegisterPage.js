class RegisterPage {
  constructor() {
    this.nameField = ".name-input";
    this.emailField = ".email-input";
    this.addressField = ".address-input";
    this.phoneField = ".phone-input";
    this.marksField = ".marks-input";
    this.qualificationField = ".qualification-selector";
    this.destinationField = ".destination-selector";
    this.ieltsField = ".ieltsband-selector";
    this.registerStudent = ".register-Button";
    this.listeningScoreField = ".listening-input";
    this.readingScoreField = ".reading-input";
    this.writingScoreField = ".writing-input";
    this.speakingScoreField = ".speaking-input";
    this.overallBandField = ".overallband-input";
    this.successMessageDiv = ".modaldiv > p";
    this.dropDownSelector = "//div[@class= ' css-4ljt47-MenuList']";
    this.ieltsScoreDiv =
      "//div[@class = 'ielts-score-div']/div[@class = 'ielts-input-div']/p";
  }

  getDropDownOptionSelector(fieldOptions) {
    const selectedXpath = `${this.dropDownSelector}/div[contains (text(), '${fieldOptions}')]`;
    return selectedXpath;
  }

  async registerStudents(data) {
    await page.fill(this.nameField, data.name);
    await page.fill(this.emailField, data.email);
    await page.fill(this.addressField, data.address);
    await page.fill(this.phoneField, data.phone);
    await page.fill(this.marksField, data.gpa);

    const qualiOptions = {
      "+2": "//div[.= '+2']",
      bachelors: "//div[.= 'bachelors']",
      masters: "//div[.= 'masters']",
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

    const destOptions = {
      australia: '//div[text()= "australia"][@id]', //    "#react-select-5-option-0",
      usa: '//div[text()= "usa"]', //   "#react-select-5-option-1",
      canada: '//div[text()= "canada"]', //   "#react-select-5-option-2",
      japan: '//div[text()= "japan"]', //   "#react-select-5-option-3",
    };
    const availableDest = Object.keys(destOptions);
    console.log(availableDest);
    if (!availableDest.includes(data.destination)) {
      throw new Error(
        `Invalid destination option provided. \n Available OPtiions are: \n${availableDest.join(
          ","
        )}`
      );
    }

    const ieltsOptions = {
      no: "#react-select-7-option-0", //    '//div[text()= "no"][@id]'
      yes: "#react-select-7-option-1", //   '//div[text()= "yes"]'
    };
    const availableIelts = Object.keys(ieltsOptions);
    console.log(availableIelts);
    if (!availableIelts.includes(data.ielts)) {
      throw new Error(
        `Invalid option provided. \n Available options are: \n${availableIelts.join(
          ","
        )}`
      );
    }

    const qualificationdd = await page.$(this.qualificationField);
    await qualificationdd.click();
    await page.pause();
    const qualLocator = await page.locator(
      this.getDropDownOptionSelector(data.qualification) // `${qualiOptions[data.qualification]}`
    );
    await qualLocator.click();
    // page.pause();

    const destinationdd = await page.$(this.destinationField);
    await destinationdd.click();
    // await page.pause();
    const destLocator = await page.locator(
      this.getDropDownOptionSelector(data.destination)
    );
    await destLocator.click();

    const ieltsdd = await page.$(this.ieltsField);
    await ieltsdd.click();
    const ieltsLocator = await page.locator(
      this.getDropDownOptionSelector(data.ielts)
    );
    await ieltsLocator.click();

    if (data.ielts === "yes") {
      if (data.listening)
        await page.fill(this.listeningScoreField, data.listening);
      if (data.reading) await page.fill(this.readingScoreField, data.reading);
      if (data.listening) await page.fill(this.writingScoreField, data.writing);
      if (data.writing) await page.fill(this.speakingScoreField, data.speaking);
      if (data.overallBand)
        await page.fill(this.overallBandField, data.overallBand);
    }

    await page.click(this.registerStudent);
  }
  async isNotVisibleIeltsBlock() {
    const ieltsPage = await page.locator(this.ieltsScoreDiv);
    await expect(ieltsPage).not.toBeVisible();
  }
  async displaySuccessMessage(successmessage) {
    const testmessage = await page.locator(this.successMessageDiv).innerText();
    successmessage = `"${successmessage}"`;
    // console.log(testmessage);
    await expect(testmessage).toBe(successmessage);
  }
}

module.exports = { RegisterPage };
