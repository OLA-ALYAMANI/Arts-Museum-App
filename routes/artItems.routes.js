// Dependencies
const express = require('express');
const moment = require("moment");
const ArtItem = require("../models/artItem.model.js");
const isLoggedIn = require("../helper/isLoggedIn");
const formidable = require('formidable');
const fs = require('fs');

const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');

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

    res.render("artitems/list", { artitems })
  }).catch(err => {
    console.log(err)
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
      res.render("artitems/search", { artistNames, years, locations });
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
      res.render("artitems/list", { artitems })
    }).catch(err => {
      console.log(err)
    })
  });
}

router.get("/artitems/add", isLoggedIn, (req, res) => {
  res.render("artitems/add");
});


router.post("/artitems/add", isLoggedIn, (req, res) => {

  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {

    var oldpath = files.imgSrc.path;
    var imagPath = '/images/' + files.imgSrc.name;
    var uploadpath = './public/images/' + files.imgSrc.name;

    fs.rename(oldpath, uploadpath, function (err) {
      if (err) throw err;
      else {
        fields.imgSrc = imagPath;


        let artItem = new ArtItem(fields);

        artItem
          .save()
          .then(() => {
            res.redirect("/artitems/list");
          })
          .catch(err => {
            console.log(err);
            res.send("Error!!!!!");
          });
      }
    });
  });
});


router.get('/artitems/:id', (req, res) => {
  console.log(req.params.id);

  ArtItem.findById(req.params.id).then(artitem => {
    console.log(artitem)

    res.render("artitems/show", { artitem });
  })
})

router.patch('/artitems/:id', (req, res) => {
  res.render("artitems/list");
})


{
  router.get('/artitems/:id/edit', (req, res) => {
    ArtItem.findById(req.params.id).then(artitem => {
      console.log(artitem)

      res.render("artitems/edit", { artitem });
    })
  })

  router.post('/artitems/:id/edit', (req, res) => {
    var form = new formidable.IncomingForm();
    let artitemID = req.params.id;
    // console.log(artitemID);
    // form.parse(req, function (err, fields, files) {

    //   var oldpath = files.imgSrc.path;
    //   var imagPath = '/images/' + files.imgSrc.name;
    //   var uploadpath = './public/images/' + files.imgSrc.name;

    //   fs.rename(oldpath, uploadpath, function (err) {
    //     if (err) throw err;
    //     else {
    //       fields.imgSrc = imagPath;
    //     }
    //   });
    // });

    let body = req.body;
    ArtItem.findByIdAndUpdate(artitemID, body, { new: true }, (err, updatedDocument) => {
      res.redirect("/artitems/list");
    })
  })
}

router.delete('/artitems/:id/delete', (req, res) => {
  console.log(req.params.id);

  ArtItem.findByIdAndDelete(req.params.id).then(artitems => {
    res.redirect("/artitems/list")
  })
})


module.exports = router;

