const mongoose = require("mongoose");

const connection = async () =>{
    try {
      await mongoose.connect("mongodb://localhost:27017/rodson-coffee")
      console.log("conectado correctamente a la base de datos ✅")  
    } catch (error) {
        console.log(error)
    }
}

module.exports ={
    connection
}