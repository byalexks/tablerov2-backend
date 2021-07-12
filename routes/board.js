const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../helpers/validarCampos");
const { getNotes, newNote, deleteNotes } = require("../controllers/board");
const { validarJTW } = require("../helpers/validarJWT");

const app = Router();

app.get(
  "/:user",
  [check("user", "el id no es valido").isMongoId(), validarJTW, validarCampos],
  getNotes
);
app.post(
  "/new",
  [
    check("title", "el titulo no puede ir vacio").not().isEmpty(),
    check("note", "las notas no pueden estar vacias").not().isEmpty(),
    validarJTW,
    validarCampos,
  ],
  newNote
);
// app.put('/', )
app.delete(
  "/:id",
  [check("id", "el id no es valido").isMongoId(), validarJTW, validarCampos],
  deleteNotes
);

module.exports = app;
