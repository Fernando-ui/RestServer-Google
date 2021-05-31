const { response } = require("express");
const path = require('path');

const cargarArchivos = ( req, res = response) => {

    
    if (!req.files || Object.keys(req.files).length === 0) {

        res.status(400).json({msg:'No se encontro ningun archivo'});
        return;
    }
    if (!req.files.archivo) {

        res.status(400).json({msg:'No se encontro ningun archivo'});
        return;
    }


    const {archivo} = req.files;

    uploadPath = path.join(__dirname, '../uploads/', archivo.name);

    archivo.mv(uploadPath, (err) => {

        if (err) {

            return res.status(500).send({err});

        }

        res.json({msg:'El archivo se ha subido al path' + uploadPath});
    
    });

}
module.exports= {

    cargarArchivos

};