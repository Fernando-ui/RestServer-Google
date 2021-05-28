const { response } = require("express");
const { ObjectId } = require('mongoose').Types;

const {Usuario, Categoria, Producto } = require('../models')

const coleccionesPermitidas = [

    'usuarios',
    'categorias',
    'productos',
    'roles'

]

const buscarUsuarios = async(termino = '', res = response) =>{


    const esMongoID = ObjectId.isValid(termino);

    if(esMongoID){

        const usuario = await Usuario.findById(termino);

        return res.json({
            result: (usuario) ? [usuario] : ['No hay usuario']
        });
    }

    const regex = new RegExp(termino,'i');

    const [usuarios, total] = [await Usuario.find({
    
        $or:[{nombre:regex}, {correo:regex}],
        $and:[{estado:true}]
        
    }), await Usuario.countDocuments({
    
        $or:[{nombre:regex}, {correo:regex}],
        $and:[{estado:true}]
        
    })];

    res.json({
        total,
        results:usuarios
    })
}

const buscarCategoria = async (termino = '', res = response ) => {

    const esMongoID = ObjectId.isValid(termino);

    if(esMongoID){

        const usuario = await Categoria.findById(termino);

        return res.json({
            result: (usuario) ? [usuario] : ['No existe categoria con ese ID, verifiquelo']
        });
    }

    const regex = new RegExp(termino,'i');

    const [usuarios, total] = [await Categoria.find({
    
        $or:[{nombre:regex}],
        $and:[{estado:true}]
        
    }), await Categoria.countDocuments({
    
        $or:[{nombre:regex}],
        $and:[{estado:true}]
        
    })];

    res.json({
        total,
        results:usuarios
    })
}

const buscarProductos = async(termino = '', res = response ) => {


    const esMongoID = ObjectId.isValid(termino);

    if(esMongoID){

        const usuario =  (await Producto.findById(termino)).populate('categoria','nombre').populate('usuario','nombre');

        return res.json({
            result: (usuario) ? [usuario] : ['No existe un producto con ese ID, verifiquelo']
        });
    }

    const regex = new RegExp(termino,'i');

    const [usuarios, total] = [await Producto.find({
    
        $or:[{nombre:regex},{descripcion:regex}],
        $and:[{estado:true}]
        
    }).populate('categoria','nombre'), await Producto.countDocuments({
    
        $or:[{nombre:regex},{descripcion:regex}],
        $and:[{estado:true}]
        
    })];

    res.json({
        total,
        results:usuarios
    })

}

const buscar = (req, res = response ) => {


    const {coleccion, termino} = req.params;

    if(!coleccionesPermitidas.includes(coleccion)){

        return res.status(400).json({
            msg:`Las colecciones permitidas son ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case'usuarios':

            buscarUsuarios(termino, res);

        break;

        case'categorias':

            buscarCategoria(termino,res);

        break;

        case'productos':

            buscarProductos(termino, res);
        break;

        default:

            res.status(500).json({
                msg:'Se le olvido hacer una busqueda'
            })

    }

    
}

module.exports = {

    buscar,
    buscarUsuarios,
    buscarCategoria

}