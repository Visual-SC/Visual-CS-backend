//importar el modelde de: bebidasFrias
const BebidasFrias = require('../models/bebidasFrias');

/*funcion para obtener los datos de: bebidasFrias ☕*/
const getColdDrinks = async (req,res) =>{
    await BebidasFrias.find({})
    .then((bebidasFriasList)=>{
        if(!bebidasFriasList){
            return res.status(400).send({
                status:"failed",
                messages:"No encuentro artículos: bebidasFrias"
            })
        }

        return res.status(200).send({
            status:"success",
            message:"bebidasFrias",
            bebidasFrias: bebidasFriasList
        })
    })
}

module.exports = {
    getColdDrinks
}
