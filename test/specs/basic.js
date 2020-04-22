const assert = require("assert");

describe("Browse pharmaceutical company names", () => {
  it("should find right companies", () => {
    browser.url("https://www.medicines.org.uk/emc/browse-companies/");
    const companiesBeginingWith = $$("ul.browse li a");
    const listingName = $$("a.key");
    const contactInfo = $$('.gfdCompanyDetailsCol')
    const companyDetail = $$('p')
    const tableHeader = $$('.gfdCompanyDetailsCol div')
    const obj = {}

    for (i = 0; i < 1; i++) {
      companiesBeginingWith[i].click();
      for (j = 0; j < listingName.length; j++) {
        if (listingName[j].index == 0) {
          listingName[j].click();
          tableHeader.forEach(add => add.getText())
 
        //   companyDetail.forEach(add => console.log("***",add.getText()))
          browser.back();
        }
        if (listingName[j].index == 2) {
          listingName[j].click();
        //   contactInfo.forEach(contact => console.log("???",contact.getAttribute('innerText')))
          browser.back();
        }
       /*  if (listingName[j].index == listingName.length) {
          listingName[j].click();
          browser.back();
        } */
      }
    }

    // companiesBeginingWith.forEach(compName => compName.click())
    // listingName.forEach(compList => compList.click())

    // const title = browser.getTitle()
    // assert.strictEqual(title, 'WebdriverIO · Next-gen browser automation test framework for Node.js')
  });
});
