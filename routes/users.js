const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { isValidRole, existsEmail, existsUserById } = require('../helpers/db-validators');

const { usersGet, usersPost, usersPut, usersPatch, usersDelete } = require('../controllers/users');

const router = Router();

router.get('/', usersGet);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('email').custom(existsEmail),
    check('password', 'La contraseña debe poseer mas de 6 letras').isLength({ min: 6 }),
    //check('role', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(isValidRole),
    validateFields
], usersPost);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existsUserById),
    check('role').custom(isValidRole),
    validateFields
], usersPut);

router.patch('/', usersPatch);

router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existsUserById),
    validateFields
], usersDelete);

module.exports = router;