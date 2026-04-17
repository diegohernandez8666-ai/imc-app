const jwt = require('jsonwebtoken')

function verificarToken(req, res, next){

    const token = req.headers['authorization']

    if(!token){
        return res.status(403).json({ error: 'Acceso denegado' })
    }

    try{
        jwt.verify(token, 'secreto')
        next()
    }catch{
        res.status(401).json({ error: 'Token invalido' })
    }
}

module.exports = verificarToken