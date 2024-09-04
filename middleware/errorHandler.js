const {constants} = require("../constants");
const errorHandler = (err,req ,res,next)=> {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                title: "validation failed",
                message: err.message,
                stactTrace : err.stack,
            });
            
            break;
            case constants.UNAUTHORIZED :
            res.json({
                title: "authorisation failed",
                message: err.message,
                stactTrace : err.stack,
            });

            case constants.FORBIDDEN :
            res.json({
                title: "FORBIDDEN",
                message: err.message,
                stactTrace : err.stack,
            });

            case constants.NOT_FOUND :
            res.json({
                title: "not found",
                message: err.message,
                stactTrace : err.stack,
            });

            case constants.SERVER_ERROR :
            res.json({
                title: "server error",
                message: err.message,
                stactTrace : err.stack,
            });

        default:
            console.log("No error , All good!");
            break;
    }
    res.json({ title: "not found" , message:err.message , stackTrace: err.stack});
    res.json({ title: "Validation Failed" , message:err.message , stackTrace: err.stack});
};

module.exports = errorHandler;