// Dependencies
const express = require('express');
const moment = require("moment");
const ArtItem = require("../models/artItem.model.js");
const isLoggedIn = require("../helper/isLoggedIn");
const formidable = require('formidable');

const fs = require('fs');

const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');

const multer = require("multer");
const path = require("path");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    let fileExtension = path.extname(file.originalname).split(".")[1];
    cb(null, file.fieldname + "-" + Date.now() + "." + fileExtension);
  }
});
var upload = multer({ storage: storage });


const router = express.Router();

// override with POST having ?_method=DELETE
router.use(methodOverride('_method'))

/*Look in the views folder for a file named "layout.ejs"*/
router.use(expressLayouts)

//gets form data 
router.use(express.urlencoded({ extended: true }))

router.get("/home", (req, res) => {
  res.render("home");
});


router.get('/artitems/list', (req, res) => {

  ArtItem.find().then(artitems => {

    res.render("artItems/list", { artitems })
  })
});

// Search routes
{
  router.get('/artitems/search', (req, res) => {
    Promise.all([
      // User.find({ _id: req.body.userId }),
      // User.find({ username: decodedUser.username})
      ArtItem.collection.distinct('artistName'),
      ArtItem.collection.distinct('year'),
      ArtItem.collection.distinct('location')
    ]).then(([artistNames, years, locations]) => {
      res.render("artItems/search", { artistNames, years, locations });
    });


  });

  router.post('/artitems/search', (req, res) => {

    for (var key in req.body) {
      if (req.body.hasOwnProperty(key)) {
        //do something with e.g. req.body[key]
        if (req.body[key] == "None") {
          delete req.body[key]
        }
      }
    }

    ArtItem.find(req.body).then(artitems => {
      res.render("artItems/list", { artitems })
    })
  });
}

router.get("/artitems/add", isLoggedIn, (req, res) => {
  res.render("artItems/add");
});


router.post("/artitems/add", isLoggedIn, upload.single("imgSrc"), (req, res, next) => {
  const file = req.file;

  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }

  let artItem = new ArtItem(req.body);

  artItem.imgSrc = "/images/" + file.filename;

  artItem
    .save()
    .then(() => {
      res.redirect("/artitems/list");
    })
});


router.get('/artitems/:id', (req, res) => {

  ArtItem.findById(req.params.id).then(artitem => {
    res.render("artItems/show", { artitem });
  })
})

router.patch('/artitems/:id', (req, res) => {
  res.render("artItems/list");
})


{
  router.get('/artitems/:id/edit', (req, res) => {
    ArtItem.findById(req.params.id).then(artitem => {
      res.render("artItems/edit", { artitem });
    })
  })

  router.post('/artitems/:id/edit', (req, res) => {
    let artitemID = req.params.id;
    let body = req.body;

    ArtItem.findByIdAndUpdate(artitemID, body, { new: true }, (err, updatedDocument) => {
      res.redirect("/artitems/list");
    })
  })
}

router.delete('/artitems/:id/delete', (req, res) => {
  ArtItem.findByIdAndDelete(req.params.id).then(artitems => {
    res.redirect("/artitems/list")
  })
})


module.exports = router;

