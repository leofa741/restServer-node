
const {response,request} = require('express');

const Usuario = require('../models/usuarios');

const bcrypt = require('bcryptjs');






const usuariosGet = async (req= request, res= response ) => {
    // const {id,nombre} = req.query
    const {limit=10,skip=0} = req.query;
    //  const usuarios = await Usuario.find({ estado: true })
    //  .limit(Number(limit))
    //     .skip(Number(skip))  

    // const total = await Usuario.countDocuments( { estado: true });

    const [total,usuarios] = await Promise.all([
        Usuario.countDocuments( { estado: true }),
        Usuario.find({ estado: true })
     .limit(Number(limit))
        .skip(Number(skip))      

    ])
    res.json({        
   total,
    usuarios 

        });
    }


const usuariosPut =async (req, res = response) => {
    const {id} = req.params;
    const {_id,password,google,correo, ...resto} = req.body;

    if(password){
        const salt = bcrypt.genSaltSync(10);
        resto.password = bcrypt.hashSync(password, salt);
    }

    const   usuario = await Usuario.findByIdAndUpdate(id,resto);

    res.json({
        message: "put world",
        id,
        usuario

    });
}



const usuariosPost = async (req =request , res =response) => {
   
    const { nombre,correo,password,rol}= req.body;  

    const usuario = new Usuario({nombre,correo,password,rol});   

    //verificar correo valido en helpers/db-validators.js
//   const existeCorreo = await Usuario.findOne({correo});
//     if(existeCorreo){
//         return res.status(400).json({
//             ok: false,
//             msg: 'El correo ya existe'
//         });
//     }   
    //encriptar contraseña
        const salt = bcrypt.genSaltSync(10);
        usuario.password = bcrypt.hashSync(password, salt);
     await usuario.save();

    res.json({                
        message: 'usuario registrado',
        usuario     
        

        });
}




const usuariosDelete = async (req, res = response) => {

    const {id} = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id,{estado: false});

    //const usuario = await Usuario.findByIdAndDelete(id);

   
        res.json({
           id,
            usuario,
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
 

}