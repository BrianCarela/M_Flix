const Comment = require('../models/comment');

async function getOneComment (req, res) {
    try {
        
        let result = await Comment.find({ movie_id: req.params.movieId });

        res.json({
            message: 'success',
            payload: result
        })
    } catch (error) {
        let errorObj = {
            message: 'get ONE comment failure',
            payload: error
        }

        console.log(errorObj)

        res.json(errorObj)
    }
}

module.exports = {
    getOneComment
}
