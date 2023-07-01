const errorResponse = require("../utils/errorResponse");

const errorHandler = async(err, req, res, next)=>{
    let error = {...err}
    error.message = err.message

    //mongoose cast error
    if(err.name === 'castError'){
        const message = 'Resources Not Found'
        error = new errorResponse(message, 404)
    }

    //duplicate ket error
    if(err.code === 11000){
        const message = 'Duplicate field value entered'
        error = new errorResponse(message, 400)
    }
    //mongoose validation
    if(err.name === 'Validation Error'){
        const message = Object.values(err.errors).map(val => val.message)
        error = new errorResponse(message, 400)
        res.status(err.statusCode || 500).json({
            success: false,
            error: err.message || 'Server Error'
        })
    }
}

module.exports = errorHandler