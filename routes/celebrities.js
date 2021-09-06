const router = require("express").Router();
const Celebrity = require('../models/Celebrity');

router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
  .then(celebritiesFromDB => {
    console.log(celebritiesFromDB);
    //// how does THIS work???
    //           V should it not be celebrities / index??
    res.render('celebrities', { celebritiesList: celebritiesFromDB });
  })
  .catch(err => {
    
    next(err);
  })
});

router.get("/celebrities/new", (req, res, next) => {
  res.render('celebrities/new');
  
});

router.get("/celebrities/:id", (req, res, next) => {
  console.log(req.params)
  const celebId = req.params.id
  Celebrity.findById(celebId)
  .then(celebrityFromDB => {
    console.log(celebrityFromDB);
    //// how does THIS work???
    //           V should it not be celebrities / index??
    res.render('celebrities/show', { celebrity: celebrityFromDB });
  })
  .catch(err => {
    
    next(err);
  })
});

router.post("/celebrities", (req, res, next) => {
  const {name, occupation, catchphrase} = req.body;
  Celebrity.create({
    name: name,
    occupation: occupation,
    catchphrase: catchphrase
  })
  .then(newCeleb => {
    console.log(newCeleb);
    res.redirect(`/celebrities/${newCeleb._id}`);
  })
  .catch(err => next(err));
});

router.get('/celebrities/:id/delete', (req, res, next) => {
  console.log('deleting this celebrity');
  const celebId = req.params.id;
  Celebrity.findByIdAndDelete(celebId)
  .then(() => {
    res.redirect('/celebrities')
  })
  .catch(err => {
    next(err);
  })
});

router.get('/celebrities/:id/edit', (req, res, next) => {
  console.log('editing this celebrity');
  const celebId = req.params.id;
  Celebrity.findById(celebId)
  .then(celeb => {
    console.log(celeb);
    res.render('celebrities/edit', { celebrity: celeb });
  }).catch(err => {
    next(err);
  })
});

router.post("/celebrities/:id", (req, res, next) => {
  const {name, occupation, catchphrase} = req.body;
  const celebId = req.params.id;
  Celebrity.findByIdAndUpdate(celebId, {
    name: name,
    occupation: occupation,
    catchphrase: catchphrase
  }, { new: true })
  .then(newCeleb => {
    console.log(newCeleb);
    res.redirect(`/celebrities/${newCeleb._id}`);
  })
  .catch(err => next(err));
});

module.exports = router;
