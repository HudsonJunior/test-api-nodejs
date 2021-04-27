/* Imports*/

const UserModel = require('./../../models/User/UserModel')
const UserService = require('./../../Services/User/UserService')

/**/

module.exports = function (server) {

    server.post('/test/api/v1/users', function (req, res, next) {

        try {

            let data = JSON.parse(req.body) || {}

            const userModel = new UserModel(data)

            const userService = new UserService()

            userService.create(userModel)
                .then(jsonSucess => {
                    const code = jsonSucess.code

                    delete jsonSucess.code

                    res.json(code, jsonSucess)
                    next()
                })
                .catch(jsonError => {
                    const code = jsonError.code

                    delete jsonError.code

                    res.json(code, jsonError)
                    next()
                })
        }
        catch (error) {
            console.log(error)
        }
    })
}