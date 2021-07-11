const { Router } = require('express');
const { check } = require('express-validator');
const { loginUser, registerUser } = require('../controllers/auth');
const { validarCampos } = require('../helpers/validarCampos');

const app = Router();

app.post("/login",
[
   check('email', 'el correo es obligatorio').isEmail(),
   check('password', 'la contraseña debe ser mayor a 6 caracteres').isLength({min:6}),
   validarCampos   
] 
,loginUser)
app.post("/register", [
    [
   check('name', 'el nombre es obligatorio').not().isEmpty(),
   check('email', 'el correo es obligatorio').isEmail(),
   check('password', 'la contraseña debe ser mayor a 6 caracteres').isLength({min:6}),
   validarCampos
    
] 
],registerUser)


module.exports = app;
