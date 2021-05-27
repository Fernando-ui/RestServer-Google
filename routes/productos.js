const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto, obtenerProductos, obtenerProductoPorID, actualizarProducto, elminarProducto } = require('../controllers/productos');
const { existeProductoPorId, existeCategoria } = require('../helpers/db-validators');
const { esAdminRole } = require('../middlewares');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');



const router = Router();

// Obtener todas las categorias - publico
router.get('/',[

validarCampos

],obtenerProductos)



router.get('/:id',[

    check('id','El id es invalido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos

], obtenerProductoPorID)


router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','Coloque el tipo de categoria').isMongoId(),
    check('categoria').custom(existeCategoria),
    validarCampos


], crearProducto)

// Atualizar - privado - cualquiera con  token valido
router.put('/:id',[
    validarJWT,
    check('id','El id es invalido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
    
],actualizarProducto);


// Borrar una categoria- Solo si es un admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','El id es invalido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
],elminarProducto)


module.exports = router;