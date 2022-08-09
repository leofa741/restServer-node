const {Router} = require('express');
const{check} = require('express-validator');



const {usuariosGet,usuariosPut,usuariosPost,usuariosDelete,usuariosPatch,saveUser} = require('../controllers/user');
const { validarCampos } = require('../middlewares/validar-campos');
const {  validarjwt } = require('../middlewares/validar-jwt');
const {esRolValido,existeCorreo,existeUsuario} =require('../helpers/db-validators')


const router = Router();



router.get('/', usuariosGet);


router.put('/:id',[
    check('id','El id es obligatorio').isMongoId(),
    check('id').custom(existeUsuario),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPut);  


router.post('/', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    // check('correo', 'El correo no es valido').isEmail(),

    check('correo').custom(existeCorreo),
    check('password', 'El password debe tener minimo 6 caracteres').isLength({min:6}),
    check('rol').custom(esRolValido),
    validarCampos
],usuariosPost);



router.delete('/:id',[
    validarjwt,
    check('id','El id es obligatorio').isMongoId(),
    check('id').custom(existeUsuario),
    validarCampos
    

], usuariosDelete);
router.patch('/',usuariosPatch );






module.exports = router;