const mongooose = require('mongoose');

const dbConexion = async() => {
    try {
        await mongooose.connect(process.env.MONGO_HOST, {
            useNewUrlParser: true,
            useUnifiedTopology: true,             
        });
        console.log('Base de datos online');
    } catch (error) {
        console.log(error);
        console.log('Error al conectar la base de datos', error);
    }


};


module.exports = dbConexion;