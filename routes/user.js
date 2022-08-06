const {Router} = require('express');
const{check} = require('express-validator');

const {usuariosGet,usuariosPut,usuariosPost,usuariosDelete,usuariosPatch,saveUser} = require('../controllers/user');


const router = Router();




router.get('/', usuariosGet);
router.put('/:id', usuariosPut);


router.post('/', [
    check('correo', 'El correo no es valido').isEmail(),

],usuariosPost);


router.post('/save', saveUser);
router.delete('/', usuariosDelete);
router.patch('/',usuariosPatch );






module.exports = router;