const jwt = require("jsonwebtoken")

function authMiddleware(req , res , next) {
    const token = req.headers["authorization"]
    
    if(!token) {
        return res.status(401).send({message: "Token não informado"})
    }

    jwt.verify(token , "MYSECRETKEY" , (err , decoded) => {
        if(err) {
            console.log(err)
            res.status(401).send({message: "Token inválido"})
            return
        }
    
        console.log(decoded)
        req.session = decoded
        next()
    })

    
}

module.exports = authMiddleware