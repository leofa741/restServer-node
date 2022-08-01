
const express = require('express');
const cors = require('cors');


class Server {

    constructor() {
        this.app=express();
        this.port=process.env.PORT ;
        this.usuariosPath='/api/usuarios';


        //middleware
        this.middleware();
        this.routes();
}

middleware() {

    //cors
    this.app.use( cors() );


    //json
    this.app.use(express.json());


    this.app.use(express.static('public'));

}

routes() {


    this.app.use(this.usuariosPath, require('../routes/user'));








}

listen() {
    this.app.listen(this.port, () => {
        console.log('Server is running', this.port);
    }
    );
}
}


module.exports = Server;




