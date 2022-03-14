const errorHandler = (err, req, res, next) => {
    //if there is a status code use it, otherwise server error
    const statusCode = res.statusCode ? res.statusCode : 500

    res.status(statusCode)

    res.json({
        message: err.message, 
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    })
}

module.exports = {
    errorHandler,
}