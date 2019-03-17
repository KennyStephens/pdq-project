const express = require("express");
const router = express.Router();
const fetch = require('node-fetch');
var HTMLParser = require('node-html-parser');

// Home Page
router.get("/", (req, res) => {
  // Fetch employee and fav drink
  fetch('https://pdqemployees.azurewebsites.net/api/pdqemployees')
    .then(res => res.json())
    .then(response => {
      // Grabbing HTML from about us page and parsing the data to get image source
      fetch('https://www.pdq.com/about-us/').then((imgResponse) => {
        return imgResponse.text();
      }).then((string) => {
        const imageURL = HTMLParser.parse(string);
        const imageArray = Array.from(imageURL.querySelectorAll('img'));

        // Comparing employee name with image src
        imageArray.forEach(src => {
          if (src.rawAttrs.toString().includes(response.name) && src.rawAttrs.toString().includes('company')) {
            const imageSrcParsed = src.rawAttrs.split('/n')[0];
            response.image = imageSrcParsed.split('"')[1];
            // Rendering page with name, beer, and correct image src
            res.render("home", {
              employee: response
            })
          }
        });
      })
    })
    .catch(err => {
      // Handling seldom HTML parsing error
      if(err.type === 'invalid-json') {
        res.redirect('/');
      }
    });
});


module.exports = router;