
class UserModel{
    
    constructor(data){
        this.user = data.user,
        this.name = data.name
        this.last_name = data.last_name
        this.cpf = data.cpf
        this.password = data.password
        this.email = data.email
        this.bo_premium = false
    }
}

module.exports = UserModel