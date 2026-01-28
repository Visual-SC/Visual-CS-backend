//importar el modelde de: adiciones
const Adiciones = require('../models/adiciones');

/*crea una ruta de prueba 💡*/

const test = (req,res) =>{
    return res.status(200).send({
        status:"successs",
        message:"ruta de prueba"
    })
}

/*funcion para obtener los datos de: adiciones ☕*/
const getAdiciones = async (req,res) =>{
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
    test,
    getAdiciones
}