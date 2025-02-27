const servicePerson = require("../services/person")

class ApiPerson {
    async FindAll( req, res) {
        try {
            const result = await servicePerson.FindAll()
            res.status(200).send({result}) 
        } catch {
            res.status(501).send({msg : "Error"})
        }
    }
    async FindById(req , res) {
        try {
            console.log(req.session)
            const {id} = req.params
            const result = await servicePerson.FindById(id)
            res.status(200).send({result}) 
        } catch {
            res.status(501).send({msg : "Error"})
        }
    }
    async Create(req , res) {
        try {
            const {name , address , userId} = req.body
            await servicePerson.Create(name , address , userId)
            res.status(201).send({}) 
        } catch {
            res.status(501).send({msg : "Error"})
        }
    }
    async Update(req , res) {
        try {
            const {id} = req.params
            const {name , address} = req.body
            const result = await servicePerson.Update(id,name , address)
            res.status(201).send({}) 
        } catch {
            res.status(501).send({msg : e.msg})
        }
    }
    async Delete(req , res) {
        try {
            const {id} = req.params
            
            await servicePerson.Delete(id)
            res.status(204).send({}) 
        } catch {
            res.status(501).send({msg : e.msg})
        }
    }

}

module.exports = new ApiPerson();

