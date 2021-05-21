const Role = require('../models/role');
const Usuario = require('../models/usuario');
const Categoria = require('../models/categoria');
const { response } = require('express');




const esRoleValido = async (rol='') => {

    const existeRol = await Role.findOne({rol});

    if(!existeRol){

        throw new Error(`El rol ${rol} no esta registrado en la base de datos`)
    }
};


const emailExiste = async ( correo = '') => {

    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){

        throw new Error(`Este correo ${correo} ya esta registrado`);
    }
}
const existeUsuarioPorId = async ( id ) => {

    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){

        throw new Error(`El id ${id} no existe`);
    }
}

const existeCategoria = async ( id ) => {

    const existeCategoria = await Categoria.findById( id );
    if(!existeCategoria){

        throw new Error(`El id ${id}, ya existe `)
    }
}

const existeNombreCategoria = async ( nombre = '') => {

    const existeNombre = await Categoria.findOne({nombre:nombre.toUpperCase()});
    
    if(existeNombre){

        throw new Error(`El nombre ${nombre} ya esta registrado`);
    }
}

module.exports = {
    
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoria,
    existeNombreCategoria

};