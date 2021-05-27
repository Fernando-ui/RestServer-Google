const response = require('express');
const { Producto } = require('../models');

const crearProducto = async (req, res = respone) => {

    const {estado, usuario, ...body} = req.body;

    const productoDB = await Producto.findOne({nombre:body.nombre.toUpperCase()})

    if(productoDB){

        return res.status(400).json({
            msg:`El producto ${body.nombre.toUpperCase()} ya esta registrado`
        })
    }

    const data = {
        ...body,
        nombre:body.nombre.toUpperCase(),
        usuario:req.usuario._id
    }

    const producto = new Producto(data);

    await producto.save();

    res.status(201).json(producto);
    
}

const obtenerProductos = async(req, res = response)=> {

    const {limite = 5, desde = 0} = req.query;
    const query = {estado:true};

    
    const [total, producto] = await Promise.all([
        
        Producto.countDocuments(query),
        Producto.find(query).skip(Number(desde)).limit(Number(limite)).populate('usuario','nombre'),
        
    ])

    res.json({
        total,
        producto
    })

}

const obtenerProductoPorID = async (req, res = response) =>{


    const {id} = req.params;
    const producto = await Producto.findById(id).populate('usuario','nombre');

    res.json({
        producto
    })

}
const actualizarProducto = async(req, res = response ) => {

    const { id } = req.params;
    const {nombre, precio, descripcion} = req.body;

    const productoCapitalizado = nombre.toUpperCase();
    
    

    const producto = await Producto.findByIdAndUpdate(id,{

        nombre:productoCapitalizado,
        precio,
        descripcion

    },{new:true}).populate('usuario','nombre');

    res.json({
        producto,
        
    })
}

const elminarProducto = async(req, res = response ) => {

    const {id} = req.params;

    const producto = await Producto.findByIdAndUpdate(id,{estado:false},{new:true});

    res.json({
    
        producto
        
    })

}

module.exports = {
    obtenerProductos,
    crearProducto,
    obtenerProductoPorID,
    actualizarProducto,
    elminarProducto
}