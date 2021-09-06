// 

const mongoose = require('mongoose');

const Celebrity = require('./models/Celebrity');

mongoose.connect('mongodb://localhost/express-movies');

const celebrities = [
	{
		name: `Rufus`,
		occupation: `unemployed`,
		catchphrase: `wof`
	},
    {
		name: `Bobby`,
		occupation: `king`,
		catchphrase: `I rule`
	},
    {
		name: `Banana`,
		occupation: `food`,
		catchphrase: `In 50 years I won't be the same!`
	},
	
]

Celebrity.insertMany(celebrities)
	.then(celebrities => {
		console.log(`Success - ${celebrities.length} VIPs seeded to the database`);
		mongoose.connection.close();
	})
	.catch(err => {
		console.log(err);
	})