
const {response,request} = require('express');

const Usuario = require('../models/usuarios');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/generarJWT');
const {  googleVerify } = require('../helpers/google-verify');




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

const googleSignin = async(req, res = response) => {

    const { id_token } = req.body;

    console.log(id_token);
   
    
    try {
        const { correo, nombre, img } = await googleVerify(id_token);


        let usuario = await Usuario.findOne({ correo });

        if ( !usuario ) {
            // Tengo que crearlo
            const data = {
                nombre,
                correo,
                password: ':)',
                img,
                google: true,
                rol: 'USER_ROLE'
            };

          
            usuario = new Usuario( data );
            await usuario.save();
        }

        // Si el usuario en DB
        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        // Generar el JWT
        const token = await generarJWT( usuario._id );
        
        res.json({
            usuario,
            token
        });
        
    } catch (error) {

        res.status(400).json({
            msg: 'Token de Google no es válido'
        })

    }



}



module.exports = {
    login,
    googleSignin
}