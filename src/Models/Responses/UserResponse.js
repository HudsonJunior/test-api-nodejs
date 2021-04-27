
module.exports = {
    Messages : {
        AlreadyRegisted : "Usuário já cadastrado",
        RegisterError : "Não foi possível cadastrar o usuário",
    },
    
    Details : {
        InvalidUser : "O user do usuário deve possuir no mínimo 4 caracteres e deve conter apenas letras, números e os caracteres ) ( _ - ] [ } {",
        InvalidName : "O nome de usuário deve contem apenas letras",
        InvalidPassword : "A senha do usuário deve possuir no mínimo 6 caracteres e deve conter apenas letras, números e os caracteres ) ( _ - ] [ } {",
        InvalidCpf : "O CPF do usuário não é válido",
        DuplicatedUser : "Já existe um usuário cadastrado com o user {user}.",
        DuplicatedEmail : "Já existe um usuário cadastrado com o email {email}.",
        DuplicatedCpf : "Já existe um usuário cadastrado com o CPF {cpf}",
        DbError : "Ocorreu um problema no banco de dados e não foi possível cadastrar o usuário"
    },
    Codes : {
        InvalidField : 400,
        DuplicatedPrimaryKey : 409,
        InternalServerError : 500,
        OkRegister : 201
    },
    
}