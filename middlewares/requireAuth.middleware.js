const logger = require('../services/logger.service')
const session = require('express-session')

async function requireAuth(req, res, next) {
    console.log(req.session, req.session.user);
    // if (!req.session || !req.session.user) {
    //     res.status(401).end('Unauthorized!');
    //     return;
    // }
    if (!req.session) {
        res.status(401).end('Unauthorized!');
        return;
    }
    next();
}

async function requireAdmin(req, res, next) {
    const user = req.session.user;
    if (!user.isAdmin) {
        res.status(403).end('Unauthorized Enough..');
        return;
    }
    next();
}


// module.exports = requireAuth;

module.exports = {
    requireAuth,
    requireAdmin
}