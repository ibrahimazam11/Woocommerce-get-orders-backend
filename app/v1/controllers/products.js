const QueryString = require('querystring');
const { wcReturn } = require('../../lib/helpers')

exports.getAll = async (req, res) => {
    try {
        const query = QueryString.stringify(req.query).replace(/%20/g, '+');
        let response = await req.WooCommerce.get(`products?${query}`)
        return res.json(wcReturn(response))
    } catch (error) {
        res.status(400).json(error.response.data)
    }
}

exports.getAllVariations = async (req, res) => {
    try {
        const query = QueryString.stringify(req.query).replace(/%20/g, '+');
        let response = await req.WooCommerce.get(`products/variations?${query}`)
        response = wcReturn(response)


        return res.json(response)
    } catch (error) {
        res.status(400).json(error.response.data)
    }
}