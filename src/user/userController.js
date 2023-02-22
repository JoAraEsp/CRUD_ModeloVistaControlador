var userService = require('./userServices');

var createUserControllerFunc = async (req, res) => {
    try {
        console.log(req.body);
        var status = await userService.createUserDBService(req.body);
        console.log(status);

        if (status) {
            res.send({ "status": true, "message": "Usuario creado" });
        } else {
            res.send({ "status": false, "message": "Error creando usuario" });
        }
    }
    catch (err) {
        console.log(err);
    }
}

var loginUserControllerFunc = async (req, res) => {
    var result = null;
    try {
        result = await userService.loginuserDBService(req.body);
        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        } else {
            res.send({ "status": false, "message": result.msg });
        }

    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

var searchUserControllerFunc = async (req, res) => {
    var result = null;
    try {
        result = await userService.searchUserDBService(req.params.firstname);
        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        } else {
            res.send({ "status": false, "message": result.msg });
        }
    } 
    catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

var deleteUserControllerFunc = async (req, res) => {
    var result = null;
    try {
        result = await userService.deleteUserDBService(req.params.id);
        if (result.status) {
            res.send({ "status": true, "message": "Usuario Eliminado" });
        } else {
            res.send({ "status": false, "message": "Lo sentimos, no se ha podido eliminar el usuario" });
        }
    } 
    catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

var updateUserControllerFunc = async (req, res) => {
    var result = null;
    const id = req.params;
    try {
        result = await userService.updateUserDBService(req.params.id, req.body);
        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        } else {
            res.send({ "status": false, "message": result.msg });
        }
    } 
    catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

module.exports = { createUserControllerFunc, loginUserControllerFunc, searchUserControllerFunc, deleteUserControllerFunc, updateUserControllerFunc };