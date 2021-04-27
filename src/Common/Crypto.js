const sha1 = require('js-sha1')

module.exports = {

    toSha1(string){
        return sha1(string)
    }
}