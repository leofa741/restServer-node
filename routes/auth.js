const {Router} = require('express');
const{check} = require('express-validator');
const { login,googleSignin} = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();



router.post('/login',[
    check('correo','Ingrese un email valido').isEmail(),
    check('password','El password debe tener minimo 6 caracteres').not().isEmpty(),
    validarCampos


], login);

router.post('/google',[
    check('id_token', 'El id_token es necesario').not().isEmpty(),
    validarCampos
], googleSignin );






module.exports = router;