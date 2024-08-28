const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
    verifyToken: (req, res, next) => {
        try{
            let token = req.headers.authorization
            if(token == null){
                return res.status(401).send({
                    message: "Token is empty"
                })
            }
            token = token.split(' ')[1]

            let verifiedUser = jwt.verify(token, process.env.KEY_JWT)
            req.user = verifiedUser //buat property baru di object req
            next()
        }catch(err){
            console.log("Ini jwt error", err);
            res.status(400).send(err)
        }
    }
}