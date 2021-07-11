const mongoose = require('mongoose')

const dbConnection = async() => {

    try {
       await  mongoose.connect(process.env.CONNECT_XD, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log('DB online')
    } catch (error) {
        console.log(error);
        throw new Error('error a iniciar la base de datos')
    }

}

module.exports ={
    dbConnection
}