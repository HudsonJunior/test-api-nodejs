/* Imports */

const mongooseStringQuery = require('mongoose-string-query');
const UserService = require('./../../Services/User/UserService')
const mongoose = require('./../../Connection/connectionMongo');
const UserResponse = require('../../Models/Responses/UserResponse');
const exceptionsClass = require('./../../models/Responses/Exceptions')
const sucessClass = require('./../../models/Responses/Sucess')
/* Global variables*/

const Exceptions = new exceptionsClass()
const Sucess = new sucessClass()

var User = null

/* */
class UserDal{
    constructor(){
        const UserSchema = this.getUserSchema()
        
        UserSchema.plugin(mongooseStringQuery);
        
        User = mongoose.model('users', UserSchema);
    }

    create(UserModel){
        return new Promise(function(resolve, reject){

            const user = new User(UserModel)

            user.save()
                .then(data => {
                    try{
                        const jsonSucess = Sucess.generateUserJsonSucess(UserResponse.Codes.OkRegister, data)

                        resolve(jsonSucess)
                    }
                    catch(error){
                        console.log(error)
                    }
                    
                })
                .catch(error =>{
                    console.log(error)
                    reject(Exceptions.generateException(UserResponse.Codes.InternalServerError, UserResponse.Messages.RegisterError, UserResponse.Details.DbError))
                })
        })
    }

    validatePrimaryKey(field, value){
        return new Promise(function(resolve, reject){

            let obj = new Object()
            obj[field] = value
            
            try{
                User.findOne(obj, function(err, data){

                    if(err){
                        console.log(err)
                        reject()
                    }

                    
                    if(!data){
                        resolve()
                    }
                        
                    else{
                        reject()
                    }
                })
            }
            catch(error){
                reject(error)
            }
        })
    }

    getUserSchema(){
        const UserSchema = new mongoose.Schema(
            {
                user: {
                    type: String,
                    required: true,
                    select: false,
                },
                password: {
                    type: String,
                    required: true,
                    select: false,
                },
                name: {
                    type: String,
                    required: true,
                },
                last_name: {
                    type: String,
                    required: true,
                },
                cpf: {
                    type: String,
                    required: true,
                },
                email: {
                    type: String,
                    required: true,
                }
            },
        );

        return UserSchema
    }
}

module.exports = UserDal