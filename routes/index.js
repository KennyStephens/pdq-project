const express = require("express");
const router = express.Router();
const fetch = require('node-fetch');
var HTMLParser = require('node-html-parser');

// Home Page
router.get("/", (req, res) => {
  fetch('https://pdqemployees.azurewebsites.net/api/pdqemployees')
    .then(res => res.json())
    .then(response => {
      // Getting image src
      fetch('https://www.pdq.com/about-us/').then((imgResponse) => {
        return imgResponse.text();
      }).then((string) => {

        const imageURL = HTMLParser.parse(string);
        const imageArray = Array.from(imageURL.querySelectorAll('img'));
        let test;
        imageArray.forEach(src => {
          if (src.rawAttrs.toString().includes(response.name) && src.rawAttrs.toString().includes('company')) {
            // console.log(src.rawAttrs.split('/n')[0]);
            const imageSrcParsed = src.rawAttrs.split('/n')[0];
            test = imageSrcParsed;
          }
        });
      }) // End of image src
      console.log(imageSrcParsed);
      res.render("home", {
        employee: response
      })
    })



    .catch(err => console.log(err))
});


module.exports = router;