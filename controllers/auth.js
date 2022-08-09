
const {response,request} = require('express');

const Usuario = require('../models/usuarios');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/generarJWT');




const login = async (req, res= response) => {

    const{correo, password} = req.body;
  

    try {
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(404).json({
                ok:false,
                msg:'El usuario no existe'
            });
        }
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg:'Contraseña incorrecta'
            });
        }

        const token = await generarJWT(usuario._id);

        res.status(200).json({
          
            ok:true,
            usuario,
            token
         
        });

       


    }
    catch (error) {
        console
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });


    }
}






  


module.exports = {
    login
}