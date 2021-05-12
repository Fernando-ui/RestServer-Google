const {response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generarJWT');


const login = async (req, res = response) => {


    const { correo, password} = req.body;

    try {


        // Verificar si el emai existe
        const usuario = await Usuario.findOne({correo});

        if(!usuario){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - Correo'
            })
        }

        // Verificar si el usuario oesta activo
        if(!usuario.estado){

            return res.status(400).json({
                msg:'Usuario / Password no son correctos - Estado: false'
            })
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password)
        if(!validPassword){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - password: false'
            })
        }

        // Generar el JWT

        const token = await generarJWT(usuario.id);

        res.json({
    
            usuario,
            token
    
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({

            msg:'Algo salio mal, hable con el administrador'
        })
    }

}

module.exports = {

    login

}

