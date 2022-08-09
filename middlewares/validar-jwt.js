const jwt = require('jsonwebtoken');
const {response,request} = require('express');

const Usuario = require('../models/usuarios');


const validarjwt =async (req =request, res=response, next) => {

    const token = req.header('Authorization');
    if(!token){
        return res.status(401).json({
            ok:false,
            msg:'No hay token'
        });
    }
    try {
        const {uid} = jwt.verify(token,process.env.SECRET0RPRIVATEKEY);
        req.uid = uid;

        const usuario = await Usuario.findById(uid);
        req.usuario = usuario;
        
        if(usuario.rol !== 'ADMIN_ROLE'){        
      
            return res.status(401).json({
                ok:false,
                msg:'No tiene permisos'
            });
        }



        if(!usuario){
            return res.status(401).json({
                ok:false,
                msg:'Token no valido o usuario no existe'
            });
        }

        if(!usuario.estado ){
            return res.status(404).json({
                ok:false,
                msg:'Usuario no encontrado o inactivo'
            });
        
        }


        next();
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:'Token no valido'
        });
    }







}


module.exports = {
    validarjwt
}
