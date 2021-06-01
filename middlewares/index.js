const validarCampos = require('../middlewares/validar-campos');
const validarRoles  = require('../middlewares/validar-role');
const validarJWT    = require('../middlewares/validar-jwt');
const validarArchivo = require('../middlewares/validarArchivo');

module.exports = {

    ...validarCampos,
    ...validarRoles,
    ...validarJWT,
    ...validarArchivo
}