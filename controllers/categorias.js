const {response } = require('express');
const {Categoria, Usuario} = require('../models');
const mongoose = require('mongoose');

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
        Categoria.find(query).skip(Number(desde)).limit(Number(limite)),
        
    ])

    res.json({
        total,
        categoria
    })

}

const obtenerUnaCategoria = async ( req, res = response) => {
    const {id} = req.params;
    const categoria = await Categoria.findById(id)

    res.json({
        categoria
        // id
    })
}




module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerUnaCategoria
}