//importar el modelde de: adiciones
const Adiciones = require('../models/adiciones');

/*funcion para obtener los datos de: adiciones ☕*/
const getAdditions = async (req,res) =>{
    await Adiciones.find({})
    .then((adicionesList)=>{
        if(!adicionesList){
            return res.status(400).send({
                status:"failed",
                messages:"No encuentro artículos: adiciones"
            })
        }

        return res.status(200).send({
            status:"success",
            message:"adiciones",
            adiciones: adicionesList
        })
    })
}

module.exports = {
    getAdditions
}