const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignIn } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post('/login', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatorio').not().isEmpty(),
    validateFields
], login);

router.post('/google', [
    check('id_token', 'Token de google es necesario').not().isEmpty(),
    validateFields
], googleSignIn);

module.exports = router;