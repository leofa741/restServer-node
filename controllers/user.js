
const {response,request} = require('express');


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



const usuariosPost =(req, res =res) => {

    const   {nombre ,edad}= req.body;
    res.status(201).json({   
        
        
        message: 'post world',
    nombre    
        
      
        });
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
    usuariosPatch

}