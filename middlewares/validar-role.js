const { response } = require('express');


const esAdminRole = (req = require, res = response, next) => {

    if(!req.usuario){

        return res.status(500).json({

            msg:'Se quiere verificar el role sin validar el token primero'
        })

    }
    const  {rol, nombre} = req.usuario ;

    if( rol !== 'ADMIN_ROLE'){

        return res.status(401).json({

            msg:`${nombre}, no tiene permisos, acuda con alguien que le pueda dar acceso`
        })
    }

    next();
}

const tieneRole = (...roles) => {

    return (req, res = response, next) => {

        if(!req.usuario){
            return res.status(500).json({
                msg:'Se requiere verificar el role sin validar el token primero'
            });
        }

        if(!roles.includes(req.usuario.rol)){

            return res.status(401).json({

                msg:`El servicio requiere un rol de administrador o un rol de ventas`
            });
        }

        next();
    }

}

module.exports = {
    esAdminRole,
    tieneRole


};