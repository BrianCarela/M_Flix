const Movie = require('../models/movie');

async function getAllMovies (req, res) {
    try {
        // default page 1
        const page = parseInt(req.params.page) || 1
        const limit = 10
        const offset = (page-1)*limit

        // Get the search query from the request
        const searchQuery = req.query.q;

        let query = {};
        if (searchQuery) {
            // Create a text search query if searchQuery is provided
            query = { $text: { $search: searchQuery } };
        }

        let movies = await Movie.find(query)
                                .skip(offset)
                                .limit(limit);

        const count = await Movie.countDocuments(query);

        res.json({
            message: 'success',
            payload: {
                movies,
                totalPages: Math.ceil(count/limit),
                currentPage: page
            }
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
