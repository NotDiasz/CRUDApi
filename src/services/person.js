

const person = require("../models/person");
const user = require("../models/user");


class ServicePerson {
    
    async FindAll(){
        return person.findAll();
    }
    async FindById(id ){
        return person.findByPk(id, {include: {model: user}});
    }
    async Create(name , address , userId){
        if (!name) {
            throw new Error('Favor informar nome')
        } else if (!address) {
            throw new Error('Favor informar endereço')
        } else if (!userId) {
            throw new Error('Favor informar numero de Id')
        } 
        await person.create({
            name , address , userId
        })
    }
    async Update(id , name , address){
        const oldPerson = await person.findByPk(id)
        if (!name) {
            throw new Error('Favor informar nome')
        } else if (!address) {
            throw new Error('Favor informar endereço')
        } 
        oldPerson.name = name
        oldPerson.address = address
       

        oldPerson.save()
        return oldPerson;
    }
    async Delete(id){
        const user = await person.findByPk(id)
        user.destroy()
    }

}

module.exports = new ServicePerson();
