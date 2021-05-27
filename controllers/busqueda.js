const { response } = require("express");



const buscar = (req, res = response ) => {


    const {coleccion, termino} = req.params;

    res.json({

        msg:'Todo ha salido bien guapeton',
        coleccion,
        termino
    })

}

module.exports = {

    buscar

}