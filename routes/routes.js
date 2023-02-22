var express = require('express');

var userController = require('../src/user/userController');
const router = express.Router();

// ruta para login
router.route('/user/login').post(userController.loginUserControllerFunc);
// ruta para crear usuario
router.route('/user/create').post(userController.createUserControllerFunc);
// ruta para busqueda
router.route('/user/search/:firstname').get(userController.searchUserControllerFunc);
// ruta para eliminar
router.route('/user/delete/:id').delete(userController.deleteUserControllerFunc);
// ruta para actualizar
router.route('/user/update/:id').put(userController.updateUserControllerFunc);


module.exports = router;
