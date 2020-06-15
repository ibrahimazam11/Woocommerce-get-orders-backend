require('dotenv').config();

let auth = (req, res, next) => {
    if (req.headers['authorization'] == process.env.auth)
        next();
    else
        return res.status(401).json("Access denied!")
}

module.exports = { auth }