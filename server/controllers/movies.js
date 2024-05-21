const Movie = require('../models/movie');

async function getAllMovies (req, res) {
    try {
        let results = await Movie.find({});

        res.json({
            message: 'success',
            payload: results
        })
    } catch (error) {
        let errorObj = {
            message: 'get all movies failure',
            payload: error
        }

        console.log(errorObj)

        res.json(errorObj)
    }
}

async function getOneMovie (req, res) {
    try {
        
        let result = await Movie.findById(req.params.id);

        res.json({
            message: 'success',
            payload: result
        })
    } catch (error) {
        let errorObj = {
            message: 'get ONE movie failure',
            payload: error
        }

        console.log(errorObj)

        res.json(errorObj)
    }
}

module.exports = {
    getAllMovies,
    getOneMovie
}