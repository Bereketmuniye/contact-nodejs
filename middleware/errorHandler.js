const { constants } = require('../constant');

const errorHandler = (err,req,res,next) =>{
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.BAD_REQUEST:
            res.json({
                title: "Bad Request",
                message: err.message,
                stack: err.stack,
            });
            break;
        case constants.UNAUTHORIZED:
            res.json({
                title: "Unauthorized",
                message: err.message,
                stack: err.stack,
            });
            break;
        case constants.NOT_FOUND:
            res.json({
                title: "Not Found",
                message: err.message,
                stack: err.stack,
            });
            break;
        case constants.INTERNAL_SERVER_ERROR:
            res.json({
                title: "Server Error",
                message: err.message,
                stack: err.stack,
            });
            break;
        case constants.FORBIDDEN:
            res.json({
                title: "Forbidden",
                message: err.message,
                stack: err.stack,
            });
            break;
        case constants.CONFLICT:
            res.json({
                title: "Conflict",
                message: err.message,
                stack: err.stack,
            });
            break;
        case constants.UNPROCESSABLE_ENTITY:
            res.json({
                title: "Unprocessable Entity",
                message: err.message,
                stack: err.stack,
            });
            break;
        default:
            break;
    }
 
    next();
};


module.exports = errorHandler;