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
    const nombreCortado = archivo.name.split('.');
    const extension = nombreCortado[nombreCortado.length - 1];

    const extensionesPermitidas = ['jpg','jpeg','png','gif'];

    if(!extensionesPermitidas.includes(extension)){

        return res.status(400).json({
            mst:`La extension ${extension} no es permitida, solo se permiten ${extensionesPermitidas}`
        })


    }

    res.json({
        extension
    })

    // uploadPath = path.join(__dirname, '../uploads/', archivo.name);

    // archivo.mv(uploadPath, (err) => {

    //     if (err) {

    //         return res.status(500).send({err});

    //     }

    //     res.json({msg:'El archivo se ha subido al path' + uploadPath});
    
    // });

}
module.exports= {

    cargarArchivos

};