//importar el modelde de: alicorados
const Alicorados = require('../models/alicorados');

/*funcion para obtener los datos de: alicorados ☕*/
const getSpiritedDrinks = async (req,res) =>{
    await Alicorados.find({})
    .then((alicoradosList)=>{
        if(!alicoradosList){
            return res.status(400).send({
                status:"failed",
                messages:"No encuentro artículos: alicorados"
            })
        }

        return res.status(200).send({
            status:"success",
            message:"alicorados",
            alicorados: alicoradosList
        })
    })
}

module.exports = {
    getSpiritedDrinks
}
