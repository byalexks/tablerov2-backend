const { response } = require("express");
const Tablero = require("../models/board-model");


const getNotes = (req, res = response) =>{
    const id = req.params.id;
    res.json({
        id  
    })

}
const newNote = async(req, res = response) =>{
    
 try {
      let board = await Tablero;
      board = new Tablero(req.body);
      await board.save();

      res.status(201).json({
        ok: true,
        tablero: board,
      });
 } catch (error) {
     console.log(error)
 } 

}
const deleteNotes = (req, res = response) =>{

}

module.exports = {
    getNotes,
    newNote,
    deleteNotes
}