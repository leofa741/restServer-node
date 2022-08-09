const {Router} = require('express');
const{check} = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();



router.post('/login',[
    check('correo','Ingrese un email valido').isEmail(),
    check('password','El password debe tener minimo 6 caracteres').not().isEmpty(),
    validarCampos


], login);





module.exports = router;