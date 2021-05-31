const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {

    try {
        const jwtToken = req.header("token");
        
        if(!jwtToken) {
            return res.status(403).json("AUTHORIZATION DENIED");
        }

        const payload = jwt.verify(jwtToken, process.env.jwtSecret);

        req.user = await payload.user;
        next();
    } catch (err) {
        res.status(401).json({  msg: "Token is Not VALID "});
    }                                                               
};   