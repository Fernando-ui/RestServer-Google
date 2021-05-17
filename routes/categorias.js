const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignin } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

// Obtener todas las categorias - publico
router.get('/',(req, res)=>{

    res.json({
        msg:'Todo salio bien'
    })

})

// Obtener una categoria por id - publico
router.get('/:id',(req, res)=>{

    res.json({
        msg:'get id'
    })

})

// Crear categoria - privado -cualquier personas con un token valido
router.post('/',(req, res)=>{

    res.json({
        msg:'post privado'
    })

})
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