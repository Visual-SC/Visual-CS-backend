//importar el modelde de: bebidasCalientesSinCafe
const BebidasCalientesSinCafe = require('../models/bebidasCalientesSinCafe');

/*funcion para obtener los datos de: bebidasCalientesSinCafe ☕*/
const getHotDrinksWithoutCoffee = async (req,res) =>{
    await BebidasCalientesSinCafe.find({})
    .then((bebidasCalientesSinCafeList)=>{
        if(!bebidasCalientesSinCafeList){
            return res.status(400).send({
                status:"failed",
                messages:"No encuentro artículos: bebidasCalientesSinCafe"
            })
        }

        return res.status(200).send({
            status:"success",
            message:"bebidasCalientesSinCafe",
            bebidasCalientesSinCafe: bebidasCalientesSinCafeList
        })
    })
}

module.exports = {
    getHotDrinksWithoutCoffee
}
