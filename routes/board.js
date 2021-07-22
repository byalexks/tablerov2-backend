const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../helpers/validarCampos");
const {
  getNotes,
  getNote,
  newNote,
  deleteNotes,
  editNote,
} = require("../controllers/board");
const { validarJTW } = require("../helpers/validarJWT");

const app = Router();

app.get(
  "/:user",
  [check("user", "el id no es valido").isMongoId(), validarJTW, validarCampos],
  getNotes
);
app.get(
  "/b/:id",
  [ validarJTW],
  getNote
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
app.put(
  "/edit/:id",
  [
    check("id", "Este id no es valido").isMongoId(),
    check("title", "el titulo no puede ir vacio").not().isEmpty(),
    check("note", "las notas no pueden estar vacias").not().isEmpty(),
    validarJTW,
    validarCampos,
  ],
  editNote
);
app.delete(
  "/:id",
  [check("id", "el id no es valido").isMongoId(), validarJTW, validarCampos],
  deleteNotes
);

module.exports = app;
