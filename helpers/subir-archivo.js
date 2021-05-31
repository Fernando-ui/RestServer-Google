const {v4:uuidv4 } = require('uuid');
const path = require('path');

const subirArchivo = ( files, extensionesPermitidas =['jpg','jpeg','png','gif'], carpeta ='') => {

    return new Promise((resolve, reject) => {
    
        const {archivo} = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];
    

        
        if(!extensionesPermitidas.includes(extension)){
    
            return reject(`La extension ${extension} no es permitida, solo se permiten ${extensionesPermitidas}`)

        }
    
        
        const nombreTemp = uuidv4() + '.' + extension;
    
        uploadPath = path.join(__dirname, '../uploads/',carpeta, nombreTemp);
    
        archivo.mv(uploadPath, (err) => {
    
            if (err) {
    
                reject(err)
    
            }
    
            resolve(nombreTemp)
        });
    


    })

    
}


module.exports = {

    subirArchivo
}