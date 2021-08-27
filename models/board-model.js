const { Schema, model } = require('mongoose');

const BoardSchema = Schema({
	title: {
		type: String,
		required: true,
	},
	note: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: new Date(),
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'Usuario',
		required: true,
	},
});

BoardSchema.method('toJSON', function () {
	const { __v, _id, ...object } = this.toObject();
	object.id = _id;
	return object;
});

module.exports = model('Tablero', BoardSchema);
