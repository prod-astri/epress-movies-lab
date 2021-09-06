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

module.exports = router;
