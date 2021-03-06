const assert = require("assert");
const fs = require('fs');
const download = require('images-downloader').images;
const path = require('path');

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
    let jsonStr = {}
    let obj = []

    for (i = 0; i < companiesBeginingWith.length; i++) {
      companiesBeginingWith[i].click();
      for (j = 0; j < listingName.length; j++) {
        if (listingName[j].index == 0) {
          listingName[j].click();
          jsonStr = saveCompanyInformationAsJsonAndCompanyLogos(jsonStr, obj);
          browser.back();
        }
      
        if (listingName[j].index == 2) {
          listingName[j].click();
          jsonStr = saveCompanyInformationAsJsonAndCompanyLogos(jsonStr, obj);
          
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
function saveCompanyInformationAsJsonAndCompanyLogos(jsonStr, obj) {
  for (k = 0; k < $$('.gfdCompanyDetailsTitle').length; k++) {
    let company = $('h1').getText()
    let key = $$('.gfdCompanyDetailsTitle')[k].getText();
    let value = $$('p')[k].getText();
    jsonStr = "{"+'"'+company+'"'+":["+"{" + '"' + key + '":' + '"' + value + '"' + "}]}";
    let temp = JSON.parse(JSON.stringify(jsonStr));
    obj.push(temp);
    // console.log(obj)
    saveJSONToFile(obj);
    const dest = 'output/companyLogos';
    // An array of image(s) to download
    const images = [$$('.companyLogoWrapper img')[0].getAttribute('src')];
    saveCompanyLogos(images, dest);
  }
  return jsonStr;
}

function saveCompanyLogos(images, dest) {
  download(images, dest)
    .then(result => {
      console.log('Images downloaded', result);
    })
    .catch(error => console.log("downloaded error", error));
}

function saveJSONToFile(obj) {
  fs.writeFile("company.json", obj, 'utf8', function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }
    console.log("JSON file has been saved.");
  });
}

