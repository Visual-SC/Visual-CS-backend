//importar el modelde de: baseDeEspresso
const BaseDeEspresso = require('../models/baseDeEspresso');

/*funcion para obtener los datos de: baseDeEspresso ☕*/
const getEspressoBased = async (req,res) =>{
    await BaseDeEspresso.find({})
    .then((baseDeEspressoList)=>{
        if(!baseDeEspressoList){
            return res.status(400).send({
                status:"failed",
                messages:"No encuentro artículos: baseDeEspresso"
            })
        }

        return res.status(200).send({
            status:"success",
            message:"baseDeEspresso",
            baseDeEspresso: baseDeEspressoList
        })
    })
}

module.exports = {
    getEspressoBased
}
