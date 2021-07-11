const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/User-model");
const { generarJWT } = require("../helpers/jwt");

const loginUser = async(req, res= response )=>{
    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({email})

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'un usuario no existe / correo '
            })
        }

        // confiramr contraseña
        const validPassowrd = bcrypt.compareSync(password, usuario.password);
        if (!validPassowrd) {
            return res.status(400).json({
                ok: false,
                msg: 'la contraseña de usuario no es correcta'
            })
        }

        // generar jwt
        const token = await generarJWT( usuario.id, usuario.name );

        // respuesta de ok
        res.status(200).json({
            ok: true,
            user:{
                uid: usuario.id,
                name: usuario.name,
                token
            
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg:'Por favor hable con el administrador'
        })
        
    }
    

}
const registerUser = async(req,res= response)=>{

   const { email, password } = req.body;

    try {
        
        let usuario = await Usuario.findOne({email})
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'un usuario existe con ese correo'
            })
        }
        usuario = new Usuario(req.body)

        // encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt )

        // guarda en la base de datos
        await usuario.save();

        // generar jwt
        const token = await generarJWT(usuario.id, usuario.name)
        
        res.status(201).json({
            ok: true,
            user:{
                uid: usuario.id, 
                nombre: usuario.name,
                token
            }    
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        })
        
    }
}

module.exports = {
    loginUser,
    registerUser
}