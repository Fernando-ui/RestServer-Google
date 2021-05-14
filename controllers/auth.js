const {response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generarJWT');
const { googleVerify } = require('../helpers/google-verify')


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

const googleSignin = async ( req, res = response) => {

    const {id_token} = req.body;

    try {
    const {correo, nombre, img} = await googleVerify(id_token);

        let usuario = await Usuario.findOne({correo});

        if(!usuario){

            const data = {

                nombre,
                correo,
                password:'empty',
                img,
                google:true
            };

            usuario = new Usuario(data);
            await usuario.save();
        }

        if(!usuario.estado){

            return res.status(401).json({

                msg:'Usuario dado de baja, hable con el administrador'
            });
        }

        // Generar el JWWT 

        const token = await generarJWT(usuario.id);
        
        res.json({
        usuario,
        token
        });

    } catch (error) {

        res.status(400).json({
            
            msg:'Token de google no es vaido'
        })
    }
    
}
module.exports = {

    login,
    googleSignin

}

