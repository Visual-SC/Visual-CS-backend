//importar el modelde de: pasteleriaDeSal
const PasteleriaDeSal = require('../models/pasteleriaDeSal');

/*funcion para obtener los datos de: pasteleriaDeSal ☕*/
const getSavoryPastries = async (req,res) =>{
    await PasteleriaDeSal.find({})
    .then((pasteleriaDeSalList)=>{
        if(!pasteleriaDeSalList){
            return res.status(400).send({
                status:"failed",
                messages:"No encuentro artículos: pasteleriaDeSal"
            })
        }

        return res.status(200).send({
            status:"success",
            message:"pasteleriaDeSal",
            pasteleriaDeSal: pasteleriaDeSalList
        })
    })
}

module.exports = {
    getSavoryPastries
}
