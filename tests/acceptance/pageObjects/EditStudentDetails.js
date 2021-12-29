class EditStudentDetails {
  constructor() {
    this.nameField = ".name-input";
    this.emailField = ".email-input";
    this.addressField = ".address-input";
    this.phoneField = ".phone-input";
    this.marksField = ".marks-input";
    this.qualificationField = ".qualification-selector";
    this.destinationField = ".destination-selector";
    this.ieltsField = ".ieltsband-selector";
    this.updateDetails = ".register-Button";
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

  async editStudents(data) {
    console.log(data.name);
    await page.pause();
    await page.fill(this.nameField, data.name);
    await page.fill(this.emailField, data.email);
    await page.fill(this.addressField, data.address);
    await page.fill(this.phoneField, data.phone);
    await page.fill(this.marksField, data.gpa);

    const qualificationdd = await page.$(this.qualificationField);
    await qualificationdd.click();
    // await page.pause();
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

    await page.click(this.updateDetails);
  }

  async updateSuccessMessage(message) {
    const updateMessage = await page
      .locator(".modaldiv text-center > p")
      .innerText();
    const testMessage = `"${message}"`;
    await expect(updateMessage).toBe(testMessage);
  }
}

module.exports = { EditStudentDetails };
