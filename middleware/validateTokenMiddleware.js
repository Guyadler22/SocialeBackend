
const utils = require('../utils')



function validateTokenMiddleware(req, res, next) {
    if(utils.validateTokenRequest(req, res)) {
        next()
    }
}


module.exports = validateTokenMiddleware