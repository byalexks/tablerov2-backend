const { response } = require('express');
const Tablero = require('../models/board-model');

const getNotes = async (req, res = response) => {
	try {
		const { user } = req.params;
		const boardUser = await Tablero.find({ user }).populate('user', 'name');
		const total = await Tablero.count();
		res.status(200).json({
			ok: true,
			board: boardUser,
			total,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: 'habla con el administrdor',
		});
	}
};
const getNote = async (req, res = response) => {

  try{
    const id = req.params.id;
    const boardUnique = await Tablero.findById(id)
    .populate('user','name')
    console.log(boardUnique);
    res.status(200).json({
      ok:true,
      boardUnique
    })
  } catch(error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: "hable con el administrador",
    });

  }

}
const newNote = async (req, res = response) => {
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
			msg: 'hable con el administrador',
		});
	}
};
const editNote = async (req, res = response) => {
	const { id } = req.params;
	console.log(id);
	try {
		const tablero = await Tablero.findById(id);
		if (!tablero) {
			return res.status(404).json({
				ok: false,
				msg: 'evento no existe por ese id',
			});
		}
		const nuevoTablero = {
			...req.body,
		};


		const tableroActualizado = await Tablero.findByIdAndUpdate(
			id,
			nuevoTablero,
			{ new: true, runValidators: true }
		);

		

		res.status(201).json({
			ok: true,
			tablero: tableroActualizado,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'comunicate con el administrador',
		});
	}
};
const deleteNotes = async (req, res = response) => {
	try {
		const { id } = await req.params;
		await Tablero.findByIdAndDelete(id);
		res.json({ ok: false, msg: 'board eliminado correctamente' });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: 'hable con el administrador',
		});
	}
};

module.exports = {
  getNotes,
  getNote,
  newNote,
  editNote,
  deleteNotes,
};
