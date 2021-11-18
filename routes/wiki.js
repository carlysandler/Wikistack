// adding routers
const express = require('express');
const router = express.Router();

// require the addPAge module from the views folder
const { Page } = require("../models");
const { addPage } = require('../views');


// Generate slug Functions
const generateSlug = (title) => {
  // Removes all non-alphanumeric characters from title
  // And make whitespace underscore
  return title.replace(/\s+/g, "_").replace(/\W/g, '');
}



router.get('/', (req, res, next) => {
  res.send('got to GET /wiki/');

});

router.post('/', async (req, res, next) => {
  try {
    const page = new Page({
      title: generateSlug(page.title),
      content: page.content
    });

    await page.save();

    res.redirect('/');
  } catch (error) { next(error) }

});

router.get('/add', (req, res, next) => {
  try {

  }
  res.send(addPage());
});



module.exports = router;
