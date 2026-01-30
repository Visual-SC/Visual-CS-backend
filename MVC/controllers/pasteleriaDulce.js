//importar el modelde de: pasteleriaDulce
const PasteleriaDulce = require('../models/pasteleriaDulce');

/*funcion para obtener los datos de: pasteleriaDulce ☕*/
const getSweetPastries = async (req,res) =>{
    await PasteleriaDulce.find({})
    .then((pasteleriaDulceList)=>{
        if(!pasteleriaDulceList){
            return res.status(400).send({
                status:"failed",
                messages:"No encuentro artículos: pasteleriaDulce"
            })
        }

        return res.status(200).send({
            status:"success",
            message:"pasteleriaDulce",
            pasteleriaDulce: pasteleriaDulceList
        })
    })
}

module.exports = {
    getSweetPastries
}
