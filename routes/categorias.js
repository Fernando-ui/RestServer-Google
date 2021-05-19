const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignin } = require('../controllers/auth');
const { crearCategoria, obtenerCategorias, obtenerUnaCategoria } = require('../controllers/categorias');
const { existeCategoria } = require('../helpers/db-validators');
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
router.put('/:id',(req, res)=>{

    res.json({
        msg:'put con id'
    })

})
// Borrar una categoria- Solo si es un admin
router.delete('/:id',(req, res)=>{

    res.json({
        msg:'delete con token'
    })

})


module.exports = router;