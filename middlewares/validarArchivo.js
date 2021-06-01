const { response } = require("express");


const validarArchivo= (req, res = response, next ) => {

    if (!req.files || Object.keys(req.files.archivo).length === 0) {

        
        return res.status(400).json({
            
            msg:'No se encontro ningun archivo'
        });

        
    }
    next()
}

module.exports = {
    validarArchivo
}