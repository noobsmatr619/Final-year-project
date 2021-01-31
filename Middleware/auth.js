const jwt = require('jsonwebtoken');
const config = require('config');
module.exports = (req, res, next) => {

    const token = req.header('x-auth-token')

    if (!token) {
        return res.status(401).json({ msg: 'No token , Authorization Denied' });
    };
    try {
        const decode = jwt.verify(token, config.get('jwtsecret'));

        req.user = decode.user;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ msg: 'Token is not valid' });
    }
}