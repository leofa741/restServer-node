
const Role = require('../models/role');
const Usuario = require('../models/usuarios');
 
const esRolValido=  async (rol='') => {
    const role = await Role.findOne({rol});
    if(!role){
        throw new Error('El rol no existe en la Base de Datos');
    }
    return true;
}

const existeCorreo = async (correo='') => {
    const existeCorreo = await Usuario.findOne({correo});
    if(existeCorreo){
        throw new Error(`El correo: ${correo} ya existe`);
    } 
     
}

const existeUsuario = async (_id='') => {
    const existeUsuario = await Usuario.findById(_id);
    if(!existeUsuario){
        throw new Error(`El usuario con el id: ${_id} no existe`);
    }
    return true;
}






module.exports={

    esRolValido,
    existeCorreo,
    existeUsuario

}
