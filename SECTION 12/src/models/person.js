const database = require("../database");



class Person {
        constructor() {
            this.model = database.db.define("people" , {
                id: {
                    type: database.db.Sequelize.INTEGER ,
                    primaryKey: true,
                    autoIncrement: true
                },
                name: {
                    type: database.db.Sequelize.STRING
                },
                address: {
                    type: database.db.Sequelize.STRING,
                } ,
                userId: {
                    type: database.db.Sequelize.INTEGER ,
                    references: {
                        model: "users" ,
                        key: "id"
                    }
                }
            })
        }
}

module.exports = new Person().model;
