
const {response,request} = require('express');

const Usuario = require('../models/usuarios');

const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');





const usuariosGet = (req= request, res= response ) => {

    const {id,nombre} = req.query

    res.json({        
        message: 'get API - usuarios',
        id,
        nombre

        });
}


const usuariosPut = (req, res = response) => {
    const id = req.params.id;
    res.json({
        message: "put world",
        id

    });
}



const usuariosPost = async (req =request , res =response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } 
    const { nombre,correo,password,role}= req.body;  

    const usuario = new Usuario({nombre,correo,password,role});   

    //verificar correo valido
  const existeCorreo = await Usuario.findOne({correo});
    if(existeCorreo){
        return res.status(400).json({
            ok: false,
            msg: 'El correo ya existe'
        });
    }


   

    //encriptar contraseña

        const salt = bcrypt.genSaltSync(10);
        usuario.password = bcrypt.hashSync(password, salt);



     await usuario.save();

    res.json({                
        message: 'post world',
        usuario     
        

        });
}



const saveUser = (req, res = response) => {
    const {nombre}= req.body;
    res.send(nombre);  
}






const usuariosDelete = (req, res = response) => {
   
        res.json({
            ok: true,
            message: 'delete world'
            });
    }

    const usuariosPatch = (req, res = response) => {
        res.json({
          
            message: 'patch world'
            });
    }


module.exports = {

    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch,
    saveUser

}