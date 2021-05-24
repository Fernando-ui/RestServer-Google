const { Schema, model} = require('mongoose');


const productoSchema = Schema({

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
    },
    precio:{
        type:Number,
        default:0,
        required:true
    },
    categoria:{
        type:Schema.Types.ObjectId,
        ref:'Categoria',
        require:true
    },
    descripcion:{
        type:String
    },
    disponible:{
        type:Boolean,
        default:true
    }

});

productoSchema.methods.toJSON = function( ) {

    const {__v,estado,...data} = this.toObject();
    return data;
    
}

module.exports = model('Producto', productoSchema);