const { response } = require("express");
const { subirArchivo } = require("../helpers");

const cargarArchivos = async( req, res = response) => {

    
    if (!req.files || Object.keys(req.files.archivo).length === 0) {

        res.status(400).json({msg:'No se encontro ningun archivo'});
        return;
    }

    try {
        
        const nombre = await subirArchivo(req.files,['txt','md'],'textos');
    
        res.json({
            nombre
        })

    } catch (msg) {
        
        res.status(400).json({
            msg
        })
    }

}

const actualizarImagen = async (req, res = response ) => {

    const {coleccion, id} = req.params;

    res.json({

        coleccion,
        id
    })
}

module.exports= {

    cargarArchivos,
    actualizarImagen

};