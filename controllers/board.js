const { response } = require("express");
const Tablero = require("../models/board-model");


const getNotes = async(req, res = response) =>{
    
    try {
        const {user} = req.params;
        const boardUser = await Tablero.find({user}).populate("user","name") 
        const total = await Tablero.count();
        res.status(200).json({
          ok: true,
          board: boardUser,
          total
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'habla con el administrdor'
        })
    }

}
const newNote = async(req, res = response) =>{
    
  tablero = new Tablero(req.body);

  try {
    tablero.user = req.uid;
    const tableroDB = await tablero.save();

    res.json({
      ok: true,
      nota: tableroDB,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: "hable con el administrador",
    });
  }

}
const deleteNotes = async(req, res = response) =>{
 try {
   const { id } = await req.params;
   await Tablero.findByIdAndDelete(id);
   res.json({ ok: false, msg: "board eliminado correctamente" });
 } catch (error) {
    console.log(error)
    return res.status(500).json({
        ok: false,
        msg: 'hable con el administrador'
    })
 }
}

module.exports = {
    getNotes,
    newNote,
    deleteNotes
}