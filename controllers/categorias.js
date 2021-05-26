const {response } = require('express');
const {Categoria, Usuario} = require('../models');

//TODO: HAcer los controladores

// Obrener categorias - paginado -  total de cuantas fuero- populate es de mongoose buscar que es 


// Usar el get
// Con el populate podemos hacer la relacion del usuario para saber quien es el que guardo
// Otro controlador llamado obtener cateogiria populate

const crearCategoria = async ( req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre})

    if(categoriaDB){
        return res.status(400).json({
            msg:`La categoria ${categoriaDB.nombre} ya existe`
        })
    }

    const data = {
        nombre,
        usuario:req.usuario._id
    }

    // Creamos una nuva categoria para el modelo
    const categoria = new Categoria(data);

    await categoria.save();

    res.status(201).json(categoria);
}


// Actualizar categoria, que nos permita cambiar el nombre de galleta en este ejemplo, al menos por otro 

// Borrar categoria , seria cambiar el estado a false 

const obtenerCategorias = async ( req, res = response) => {

    const {limite = 5, desde = 0} = req.query;
    const query = {estado:true};

    
    const [total, categoria] = await Promise.all([
        
        Categoria.countDocuments(query),
        Categoria.find(query).skip(Number(desde)).limit(Number(limite)).populate('usuario','nombre'),
        
    ])

    res.json({
        total,
        categoria
    })

}

const obtenerUnaCategoria = async ( req, res = response) => {
    const {id} = req.params;
    const categoria = await Categoria.findById(id).populate('usuario','nombre');

    res.json({
        categoria
        // id
    })
}

const actualizarCategoria = async (req, res = response) => {

    const {id} = req.params;
    const {estado,_id,usuario,...resto} = req.body;

    // Capitalizando lo que estamos obteniendo
    const restoCapitalizado = resto.nombre.toUpperCase();
    const nameObject = {
        nombre:restoCapitalizado
    };

    // El {new:true} nos devuelve el objeto nuevo, o modificado para que lo podamos mostrar a como se actualizo
    const categoria = await Categoria.findByIdAndUpdate(id,nameObject,{new:true});

    res.json({
        categoria
        
    })
}
const borrarCategoria = async (req, res = response ) => {


    const { id } = req.params;


    const usuario = await Categoria.findByIdAndUpdate(id, {estado:false},{new:true});

    res.json({
        usuario

    });
    

}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerUnaCategoria,
    actualizarCategoria,
    borrarCategoria
}