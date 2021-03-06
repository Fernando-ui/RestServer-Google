const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignin } = require('../controllers/auth');
const { crearCategoria, obtenerCategorias, obtenerUnaCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeCategoria, existeNombreCategoria } = require('../helpers/db-validators');
const { esAdminRole } = require('../middlewares');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');



const router = Router();

// Obtener todas las categorias - publico
router.get('/',[

validarCampos

],obtenerCategorias)



router.get('/:id',[

    check('id','El id es invalido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos

], obtenerUnaCategoria)


router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos


], crearCategoria)

// Atualizar - privado - cualquiera con  token valido
router.put('/:id',[

    check('id','El id es invalido').isMongoId(),
    check('id').custom(existeCategoria),
    check('nombre').custom(existeNombreCategoria),
    validarCampos
    
],actualizarCategoria);


// Borrar una categoria- Solo si es un admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','El id es invalido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
],borrarCategoria)


module.exports = router;