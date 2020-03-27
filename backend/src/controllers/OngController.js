const conection = require('../database/conection')
const crypto = require('crypto');


module.exports = {
    async store(req, res) {

        const { name, email, whatsapp, city, uf } = req.body

        const id = crypto.randomBytes(4).toString('HEX');

        await conection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })

        return res.json({ id })
    },
    async index(req, res) {

        const ongs = await conection('ongs').select('*');

        return res.json(ongs)
    }
}