const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async (role = '') => {
    const roleExists = await Role.findOne({ role });
    if (!roleExists) {
        throw new Error(`El rol ${role} no esta registrado en la DB`)
    }
}

const existsEmail = async (email = '') => {
    //Verificar si el correo existe
    const emailExists = await User.findOne({ email });
    if (emailExists) {
        throw new Error(`El email ${email} ya esta registrado`);
    }
}

const existsUserById = async (id) => {
    //Verificar si el correo existe
    const userExists = await User.findById(id);
    if (!userExists) {
        throw new Error(`El id ${id} no existe`);
    }
}

module.exports = {
    isValidRole,
    existsEmail,
    existsUserById
}