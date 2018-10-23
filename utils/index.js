const crypto = require('crypto')

function generateHash(data, size) {
    let hash = crypto.createHash('sha256')
    hash.update(data, 'utf8')
    hash = hash.digest('binary')

    const output = new Buffer(size)
    output.fill(0)
    const cipher = crypto.createCipher('aes256', hash)
    const a = cipher.update(output, undefined, 'hex')
    const offset = output.write(a, 'binary')
    output.write(cipher.final('hex'), offset, 'binary')
    return output.toString()
}

module.exports = {
    generateHash
}