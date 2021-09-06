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
		// redirect / render the detail view for this book
		//res.render('bookDetails', { book: createdBook });
		// doesnt get arguments cause its like writing it directly in the browser
		// redirects to the new page instead of rendering the book I had
		res.redirect(`/celebrities/${newCeleb._id}`);
	})
	.catch(err => next(err));
});
module.exports = router;
