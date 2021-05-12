const { Router } = require('express');
const { check } = require('express-validator');

// const { validarCampos } = require('../middlewares/validar-campos');
// const {esAdminRole, tieneRole} = require('../middlewares/validar-role');
// const { validarJWT } = require('../middlewares/validar-jwt');

// Como el archivo se llama index por defaul exporta el archivo index
const { validarCampos,
        validarJWT,
        esAdminRole,
        tieneRole    } = require('../middlewares');


const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet,
        usuariosPost,
        usuarioPut,
        usuarioDelete,
        usuarioPatch } = require('../controllers/usuarios');

const router = Router();

router.get('/',usuariosGet);

router.post('/', [

    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio y debe de ser una longitud de 6 letras').isLength({min:6}),
    check('correo','El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    // check('rol','No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRoleValido),
    validarCampos
    
],usuariosPost);

router.put('/:id',[
    check('id','El id es invalido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
    
], usuarioPut);

router.patch('/', usuarioPatch);


router.delete('/:id',[
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id','El id es invalido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos

] ,usuarioDelete );













module.exports = router;