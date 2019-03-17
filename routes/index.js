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
      const thing = fetch('https://www.pdq.com/about-us/').then((imgResponse) => {
        return imgResponse.text();
      }).then((string) => {
        const imageURL = HTMLParser.parse(string);
        const imageArray = Array.from(imageURL.querySelectorAll('img'));

        imageArray.forEach(src => {
          if (src.rawAttrs.toString().includes(response.name) && src.rawAttrs.toString().includes('company')) {
            const imageSrcParsed = src.rawAttrs.split('/n')[0];
            response.image = imageSrcParsed.split('"')[1];

            res.render("home", {
              employee: response
            })
          }
        });
      })
    })
    .catch(err => {
      if(err.type === 'invalid-json') {
        res.redirect('/');
      }
    });
});


module.exports = router;