const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    
    //Leer el toquen del header
    const token = req.header('x-auth-token');

    //Revisar el toquen
    if (!token) {
        return res.status(401).json({msg: 'No hay token, permiso no válido'})
    }

    //Validar el toquen
    try{
        const cifrado = jwt.verify(token, process.env.SECRETA);
        req.usuario = cifrado.usuario;
        //Para pasar al siguiente middleware
        next();
        
    }catch(error){
        res.status(401).json({msg: 'Token no válido'})
    }
}