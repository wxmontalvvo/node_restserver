const { response, request } = require('express');

const usersGet = (req = request, res = response) => {

    const {nombre = 'No name', apikey, page = 1, limit} = req.query; //Se puede establecer query por defecto si no se lo envia

    res.json({
        msg: 'get API - controlador',
        nombre,
        apikey,
        page,
        limit
    });
}

const usersPost = (req, res = response) => {

    const { nombre, edad } = req.body;

    res.status(201).json({
        msg: 'post API - controlador',
        nombre,
        edad
    });
}

const usersPut = (req, res = response) => {

    const { id } = req.params;
    
    res.json({
        msg: 'put API - controlador',
        id
    });
}

const usersPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controlador'
    });
}

const usersDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - controlador'
    });
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}