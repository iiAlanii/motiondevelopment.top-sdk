const ApiError = require('./ApiError');

class ErrorHandler {
    handleError(err) {
        if (err instanceof ApiError) {
            // do not handle ApiError, allow it to be thrown
            throw err;
        } else {
            // handle other errors
            console.error(`[Motionbotlist]: ` + err);
            // send a message to the user if desired
        }
    }
}

module.exports = ErrorHandler;
