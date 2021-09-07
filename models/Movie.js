const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const movieSchema = new Schema({
	title: String,
	genre: String,
	plot: String,
	cast: [
		{
			type: Schema.Types.ObjectId,
			// so this is the part connecting to the authors colecion
			ref: 'Celebrity'
		}
	],
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;