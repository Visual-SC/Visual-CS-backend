//importar el modelde de: cafeEnCasa
const CafeEnCasa = require('../models/cafeEnCasa');

/*funcion para obtener los datos de: cafeEnCasa ☕*/
const getCoffeeAtHome = async (req,res) =>{
    await CafeEnCasa.find({})
    .then((cafeEnCasaList)=>{
        if(!cafeEnCasaList){
            return res.status(400).send({
                status:"failed",
                messages:"No encuentro artículos: cafeEnCasa"
            })
        }

        return res.status(200).send({
            status:"success",
            message:"cafeEnCasa",
            cafeEnCasa: cafeEnCasaList
        })
    })
}

module.exports = {
    getCoffeeAtHome
}
