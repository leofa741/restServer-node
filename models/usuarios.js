// {

//     nombre: '',
//     correo: '',
//     password: '',
//     img: '',
//     role: 'USER_ROLE',
//     estado: 'false'
//     Google: false
//
// }
 

const {Schema ,model} = require('mongoose');

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    
    correo: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: true,
        enum: ['USER_ROLE', 'ADMIN_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
} ,{
    timestamps: true
} );


module.exports = model('Usuario',usuarioSchema);