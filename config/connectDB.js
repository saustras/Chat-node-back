const mongoose = require('mongoose');


async function connectDB() {
    try {
        
        await mongoose.connect(process.env.MONGODB_URI)
        const connection = mongoose.connection;

        mongoose.connection.on('connected',()=> {
            console.log("Base datos conectada");
        })

        connection.on('error',(error) =>{
            console.log("Error al conectar a la base de datos", error)
        })

    } catch (error) {
        console.log("Error al conectar a la base de datos", error)
    }
}

module.exports = connectDB