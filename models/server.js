const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{
    
    constructor(  ){
        this.app = express();
        this.port = process.env.PORT;

        
        this.usuarioPath = '/api/usuarios';
        this.authPath    = '/api/auth';


        // Conectar a la base de datos
        this.conectarBD();
        // Middlewares
        this.middlewares();

        // Rutas De La Aplicacion
        this.routes();

    }

    async conectarBD ( ){

        await dbConnection();
    }
    
    middlewares(){
        // Cors
        this.app.use(cors());
        // Directorio publico
        this.app.use(express.static('public'));

        // Lectura y parseo del body
        this.app.use(express.json() );

    }

    routes(){

        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuarioPath, require('../routes/usuarios'));
    }

    listener(){

        this.app.listen(this.port,()=>{
            console.log('Corriendo en el puerto',this.port);
        })
    }
}

module.exports = Server;