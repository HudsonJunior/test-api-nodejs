/* imports */

const mongoose = require('./../../Connection/connectionMongo');
const exceptionsClass = require('./../../models/Responses/Exceptions')
const UserResponse = require('./../../Models/Responses/UserResponse')
const UserDal = require('./../../Daos/User/UserDal')
const string = require('./../../Common/String')
const Crypto = require('./../../common/Crypto')
const Cpf = require('./../../Common/Cpf')
const UserValue = require('./../../Values/UserValue')
const AuthValue = require('./../../Values/AuthValue')
/* Global variables*/

const Exceptions = new exceptionsClass()
const userDal = new UserDal()

var userService

/* */

class UserService {
    constructor(){
        userService = this
    }

    async create(UserModel){
        return new Promise(async function(resolve, reject){
            try{

                const validateUser = await userService.validateUser(UserModel.user) 
                const validateEmail = await userService.validateEmail(UserModel.email)
                const validateCpf = await userService.validateCpf(UserModel.cpf)
                const validatePassword = await userService.validatePassword(UserModel.password)

                const fullName = `${UserModel.name} ${UserModel.last_name}`
                const validateName = await userService.validateName(fullName)

                UserModel.cpf = string.getOnlyNumbers(UserModel.cpf)
                UserModel.password = Crypto.toSha1(UserModel.password)

                userDal.create(UserModel)
                    .then(result => {
                        
                        result.cash_token = AuthValue.cash_token
                        
                        resolve(result)
                    })
                    .catch(error => {
                        reject(error)
                    })
                
            }
            catch(error){
                reject(error)
            }
        })
    }

    validatePrimaryKey(field, value){

        return new Promise(function(resolve, reject){

            userDal.validatePrimaryKey(field, value)
                .then(result => {
                    resolve()
                })
                .catch(error => {
                    reject(error)
                });
        })  
    }

    validateUser(user){
        return new Promise(function(resolve, reject){

            try{

                if(!string.validateUser(user)){
                    reject(Exceptions.generateException(UserResponse.Codes.InvalidField,UserResponse.Messages.RegisterError, UserResponse.Details.InvalidUser))
                }

                userService.validatePrimaryKey(UserValue.user, user)
                    .then(result => {
                        resolve()
                    })
                    .catch(error => {
                        reject(Exceptions.generateException(UserResponse.Codes.DuplicatedPrimaryKey, UserResponse.Messages.AlreadyRegisted, UserResponse.Details.DuplicatedUser.replace(UserValue.userReplaced, user)))
                        
                    })                
            }
            catch(error){
                reject(error)
            }
        })
    }

    validateEmail(email){
        return new Promise(function(resolve, reject){

            try{
                userService.validatePrimaryKey(UserValue.email, email)
                    .then(result => {
                        resolve()
                    })
                    .catch(error => {
                        reject(Exceptions.generateException(UserResponse.Codes.DuplicatedPrimaryKey, UserResponse.Messages.AlreadyRegisted, UserResponse.Details.DuplicatedEmail.replace(UserValue.emailReplaced, email)))
                })
        
            }
            catch(error){
                reject(error)
            }
        })
    }

    validateCpf(cpf){
        return new Promise(function(resolve, reject){
            try{

                if(!Cpf.validateCpf(cpf)){
                    reject(Exceptions.generateException(UserResponse.Codes.InvalidField, UserResponse.Messages.RegisterError, UserResponse.Details.InvalidCpf))
                }

                cpf = string.getOnlyNumbers(cpf)
                
                userService.validatePrimaryKey(UserValue.cpf, cpf)
                    .then(result => {
                        resolve()
                    })
                    .catch(error =>{
                        reject(Exceptions.generateException(UserResponse.Codes.DuplicatedPrimaryKey, UserResponse.Messages.AlreadyRegisted, UserResponse.Details.DuplicatedCpf.replace(UserValue.cpfReplaced, cpf)))

                    })
            }
            catch(error){
                reject(error)
            }
        })
    }

    validatePassword(password){
        return new Promise(function(resolve, reject){
            try{

                if(string.validatePassword(password)){
                    resolve()
                }

                else{
                    reject(Exceptions.generateException(UserResponse.Codes.InvalidField, UserResponse.Messages.RegisterError, UserResponse.Details.InvalidPassword))
                }
            }
            catch(error){
                reject(error)
            }
        })
    }


    validateName(fullName){
        return new Promise(function(resolve, reject){

            try{
                if(string.validateOnlyLetters(fullName)){
                    resolve()
                }
                
                else{
                    reject(Exceptions.generateException(UserResponse.Codes.InvalidField,UserResponse.Messages.RegisterError, UserResponse.Details.InvalidName))
                }
            }

            catch(error){
                reject(error)
            }
        })
    }
}

module.exports = UserService