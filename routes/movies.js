// const router = require("express").Router();
// const Movie = require('../models/Movie');
// const Celebrity = require('../models/Celebrity');

// router.get("/movies", (req, res, next) => {
//   Movie.find()
//   .then(moviesFromDB => {
//     console.log(moviesFromDB);
    
//     res.render('movies', { moviesList: moviesFromDB });
//   })
//   .catch(err => {
    
//     next(err);
//   })
// });



// router.get("/movies/:id", (req, res, next) => {
//   console.log(req.params)
//   const movieId = req.params.id
//   Movie.findById(movieId)
//   .then(movieFromDB => {
//     console.log(movieFromDB);
//     //// how does THIS work???
//     //           V should it not be movies / index??
//     res.render('movies/show', { movie: movieFromDB });
//   })
//   .catch(err => {
    
//     next(err);
//   })
// });



// router.get('/movies/:id/delete', (req, res, next) => {
//   console.log('deleting this movie');
//   const movieId = req.params.id;
//   Movie.findByIdAndDelete(movieId)
//   .then(() => {
//     res.redirect('/movies')
//   })
//   .catch(err => {
//     next(err);
//   })
// });

// router.get('/movies/:id/edit', (req, res, next) => {
//   console.log('editing this movie');
//   const movieId = req.params.id;
//   Movie.findById(movieId)
//   .then(celeb => {
//     console.log(celeb);
//     res.render('movies/edit', { movie: celeb });
//   }).catch(err => {
//     next(err);
//   })
// });

// router.post("/movies/:id", (req, res, next) => {
//   const {name, occupation, catchphrase} = req.body;
//   const movieId = req.params.id;
//   Movie.findByIdAndUpdate(movieId, {
//     name: name,
//     occupation: occupation,
//     catchphrase: catchphrase
//   }, { new: true })
//   .then(newMovie => {
//     console.log(newMovie);
//     res.redirect(`/movies/${newMovie._id}`);
//   })
//   .catch(err => next(err));
// });

// module.exports = router;
