

const User = require("../models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const secretKey = "MYSECRETKEY"
const salt = 10


class ServiceUser {
    
    async FindAll(transaction){
        return User.findAll({transaction});
    }
    async FindById(id , transaction){
        return User.findByPk(id, {transaction});
    }
    async Create(email , password , transaction){
        if (!email) {
            throw new Error('Favor informar email')
        } else if (!password) {
            throw new Error('Favor informar email')
        }

        const hasPass = await bcrypt.hash(password, salt)

        return User.create({
           email ,password: hasPass 
        } , {transaction})
    }
    async Update(id , password , email , transaction){
        const oldUser = await User.findByPk(id , {transaction})
        

        
        oldUser.email = email || oldUser.email
        oldUser.password = password ? await bcrypt.hash(password, salt) : oldUser.password

        oldUser.save({transaction})
        return oldUser;
    }
    async Delete(id , transaction){
        const user = await User.findByPk(id , {transaction})
        user.destroy({transaction})

        return true
    }

    async Login(email , password) {
        
        if (!email) {
            throw new Error('Favor informar email')
        } else if (!password) {
            throw new Error('Favor informar email')
        }

        const currentuser = await User.findOne({where: {email}})

        if (!currentuser) {
            throw new Error("Email ou Senha Invalidos")
        }

        const verify = await bcrypt.compare(password, currentuser.password)

        if (verify) {
            return jwt.sign({ id: currentuser.id }, secretKey, {expiresIn: 60*60});
        }
    }

    


}

module.exports = new ServiceUser();
