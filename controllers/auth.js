const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        //Verificar si el email existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            })
        }

        //Verificar si el usuario esta activo
        if (!user.status) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            })
        }

        //Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos -password'
            })
        }

        //Generar el JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Algo salio mal'
        })
    }
}

const googleSignIn = async (req = request, res = response) => {

    const { id_token } = req.body;

    try {

        const { name, img, email } = await googleVerify(id_token);

        let user = await User.findOne({ email });

        if (!user) {

            const data = {
                name,
                email,
                password: 'pswd',
                img,
                role: 'USER_ROLE',
                google: true
            };

            user = new User(data);
            await user.save();
        }

        //Usuario en DB creado
        if (!user.status) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        //Generar el JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'El token de google no se pudo verificar'
        })
    }


}

module.exports = {
    login,
    googleSignIn
}