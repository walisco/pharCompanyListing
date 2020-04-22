const assert = require("assert");
const fs = require('fs');

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
    const contactInfo = $$('.gfdCompanyDetailsCol');
    const companyDetail = $$('p');
    const comDetails = $$('.gfdCompanyDetailsTitle +div p')
    const tableHeader = $$('.gfdCompanyDetailsCol div');
    const companyHeader = $$('.gfdCompanyDetailsTitle');
    let jsonStr = {}
    let obj = []

    for (i = 0; i < companiesBeginingWith.length; i++) {
      companiesBeginingWith[i].click();
      for (j = 0; j < listingName.length; j++) {
        if (listingName[j].index == 0) {
          listingName[j].click();
         


          for(k=0; k < $$('.gfdCompanyDetailsTitle').length; k++) {
            let key = $$('.gfdCompanyDetailsTitle')[k].getText()
            let value = $$('p')[k].getText();
            jsonStr = "{"+'"'+key+'":'+'"'+value+'"'+"}";
            let temp =JSON.parse(JSON.stringify(jsonStr))
            obj.push(temp)
            console.log("**", obj)

            fs.writeFile ("company.json", obj, 'utf8', function (err) {
              if (err) {
                  console.log("An error occured while writing JSON Object to File.");
                  return console.log(err);
              }
           
              console.log("JSON file has been saved.");
          });
          }
         
          browser.back();
        }
      
        if (listingName[j].index == 2) {
          listingName[j].click();
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
