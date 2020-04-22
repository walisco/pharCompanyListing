const assert = require("assert");

describe("check page title", () => {
    it("should have the correct title", () => {
        browser.url("https://www.medicines.org.uk/emc/browse-companies/");
        const title = browser.getTitle()
        assert.strictEqual(title, 'Browse Pharmaceutical Company Names starting with A - (emc)')
        
    })
})
describe("Browse pharmaceutical company names", () => {
  it("should find right companies", () => {
    browser.url("https://www.medicines.org.uk/emc/browse-companies/");
    const companiesBeginingWith = $$("ul.browse li a");
    const listingName = $$("a.key");
    const contactInfo = $$('.gfdCompanyDetailsCol')
    const companyDetail = $$('p')
    const tableHeader = $$('.gfdCompanyDetailsCol div')
    let jsonStr = {}
    let obj = []

    for (i = 0; i < 2; i++) {
      companiesBeginingWith[i].click();
      for (j = 0; j < listingName.length; j++) {
        if (listingName[j].index == 0) {
          listingName[j].click();
          companyDetail.forEach(add => jsonStr = "{["+"address:"+'"'+add.getText()+'"'+"}]");
          let temp =JSON.parse(JSON.stringify(jsonStr))
          obj.push(temp)
          console.log("**", obj)
          
          
          // tableHeader.forEach(add => add.getText())
        

        //   companyDetail.forEach(add => console.log("***",add.getText()))
          browser.back();
        }
      
        if (listingName[j].index == 2) {
          listingName[j].click();
          // companyDetail.forEach(add => obj = JSON.parse("{["+"address:"+add.getText()+"}]"));
        //   contactInfo.forEach(contact => console.log("???",contact.getAttribute('innerText')))
          browser.back();
        }
       /*  if (listingName[j].index == listingName.length) {
          listingName[j].click();
          browser.back();
        } */
      }
    }

  });
});
