

const { Schema, model} = require('mongoose');


const categoriaChema = Schema({

    nombre:{
        type:String,
        required:[true, 'El nombre es obligatorio'],
        unique:true
    },
    estado:{
        type:Boolean,
        default:true,
        required:true
    },
    usuario:{
        // Esto para que apunte al id correcto, sera otro objeto que tendremos en Mongo
        type: Schema.Types.ObjectId,
        // Estamos relacionando este usuario con el schema Usuario
        // Esta referencia tiene que ser igual al nuestro schema de usuario
        ref:'Usuario',
        required:true
    }

});

module.exports = model('Categoria', categoriaChema);