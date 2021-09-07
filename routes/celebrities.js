const router = require("express").Router();
const Celebrity = require('../models/Celebrity');
const Movie = require('../models/Movie');

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






router.get("/movies", (req, res, next) => {
  Movie.find()
  .then(moviesFromDB => {
    console.log(moviesFromDB);
    
    res.render('movies', { moviesList: moviesFromDB });
  })
  .catch(err => {
    
    next(err);
  })
});

router.get("/movies/new", (req, res, next) => {
  // we need to get all the authors from the db
  Celebrity.find()
  .then(celebritiesFromDB => {
    console.log(celebritiesFromDB);
    res.render('movies/new', { celebritiesList: celebritiesFromDB });
  })
});

router.post("/movies", (req, res, next) => {
  console.log(`---------- REQ PARAMS:`)
  console.log(req.params);
  console.log(`---------- REQ BODY:`)
  console.log(req.body);
  const {title, genre, plot, cast} = req.body;
  Movie.create({
    title: title,
    genre: genre,
    plot: plot,
    cast: cast    
  })
  .then(newMovie => {
    console.log(`---------- NEW MOVIE:`)
    console.log(newMovie);
    res.redirect(`/movies/${newMovie._id}`);
  })
  .catch(err => next(err));
});

router.get("/movies/:id", (req, res, next) => {
  console.log(req.params)
  const movieId = req.params.id
  Movie.findById(movieId).populate('cast')
  .then(movieFromDB => {

    res.render('movies/show', { movie: movieFromDB });
  })
  .catch(err => {
    next(err);
  })
});

router.get('/movies/:id/edit', (req, res, next) => {
  console.log('editing this movie');
  const movieId = req.params.id;
  Movie.findById(movieId)
  .then(movie => {
    console.log(movie);
    res.render('movies/edit', { movie: movie });
  }).catch(err => {
    next(err);
  })
});

module.exports = router;
