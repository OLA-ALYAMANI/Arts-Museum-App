const express = require('express')
const moment = require("moment")
const router = express.Router()
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const formidable = require('formidable');

const isLoggedIn = require("../helper/isLoggedIn");
const Tour = require('../models/tour.model')
const User = require('../models/user.model')


router.use(express.urlencoded({ extended: true }));

// For file name "layout.ejs"
router.use(expressLayouts)

// override with POST having ?_method=DELETE
router.use(methodOverride('_method'))

router.get('/tours/list', (req, res) => {

  Tour.find().populate('tourGuide').then(tours => {

    // List of tour
    res.render("tours/list", { tours })
  }).catch(err => {
    console.log(err)
  })
});

// Create new tour
router.get('/tours/create', isLoggedIn, (req, res) => {
  User.find({ type: "tourGuide" }).then(tourGuides => {

    res.render("tours/create", { tourGuides })
  }).catch(err => {
    console.log(err)
  })
})

router.post('/tours/create', (req, res) => {
  console.log(req.body)
  let tours = new Tour(req.body)

  tours.save()
    .then(() => {
      res.redirect('/tours/list')
    })
    .catch(err => {
      console.log(err)
    })
})

// Show the tour
router.get('/tours/:id', (req, res) => {
  console.log(req.params.id);

  Tour.findById(req.params.id).populate('tourGuide').then(tour => {
    console.log(tour)

    res.render("tours/show", { tour });
  })
})

router.get('/tours/:id/edit', isLoggedIn, (req, res) => {
  Promise.all([
    Tour.findById(req.params.id).populate('tourGuide'),
    User.find({ type: "tourGuide" })
  ]).then(([tour, tourGuides]) => {
    res.render("tours/edit", {tour, tourGuides});
  });
});

router.post('/tours/:id/edit', (req, res) => {
  req.params.id;
  let body = req.body;
  Tour.findByIdAndUpdate(req.params.id, body, { new: true }, (err, updatedDocument) => {
    res.redirect("/tours/list");
  })
})

// for delete the tours
router.delete('/tours/:id/delete', isLoggedIn, (req, res) => {
  console.log(req.params.id);

  Tour.findByIdAndDelete(req.params.id).then(tour => {
    res.redirect("/tours/list")
  })
})

//Edit route
router.post('/tours/:id/book', (req, res) => {
  console.log("it's working!")
  
  User.findByIdAndUpdate(req.user._id, {$addToSet: {bookedTours: req.params.id}}, { new: true }, (err, updatedDocument) => {
    console.log("it's working!")
    res.redirect(req.get('referer'));
  })
})

router.post('/tours/:id/cancel', (req, res) => {
  console.log("it's working!")
  
  User.findByIdAndUpdate(req.user._id, {$pull: {bookedTours: req.params.id}}, { new: true }, (err, updatedDocument) => {
    console.log("it's working!")
    res.redirect(req.get('referer'));
  })
})

module.exports = router