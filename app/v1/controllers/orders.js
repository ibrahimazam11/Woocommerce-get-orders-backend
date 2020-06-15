const QueryString = require('querystring');
const async = require('async');
const { wcReturn } = require('../../lib/helpers')
const constants = require('../../lib/constants');
require('dotenv').config();

exports.login = async (req, res) => {
    try {
        let { email, password } = req.body;
        if (email == process.env.email && password == process.env.password) {
            return res.json({ success: true, data: 'Log in successful' })
        }
        else {
            return res.status(401).json({ success: false, data: 'Invalid credentials' })
        }
    } catch (error) {
        res.status(400).json(error.response ? error.response.data : error.message)
    }
}

exports.getAll = async (req, res) => {
    try {
        req.query.per_page = 100;
        let { delivery, orderby } = req.query;
        delete req.query.delivery;
        if (!orderby) {
            delete req.query.orderby
            delete req.query.order
        }
        const query = QueryString.stringify(req.query).replace(/%20/g, '+');
        let response = await req.WooCommerce.get(`orders?${query}`)
        return res.json(wcReturn(response, +delivery))
    } catch (error) {
        res.status(400).json(error.response ? error.response.data : error.message)
    }
}

exports.notes = async (req, res) => {
    try {
        const query = QueryString.stringify(req.query).replace(/%20/g, '+');
        let response = await req.WooCommerce.get(`orders/${req.params.orderId}/notes?${query}`)
        return res.json(wcReturn(response))
    } catch (error) {
        res.status(400).json(error.response.data)
    }
}

exports.getCustomerOrders = async (req, res) => {
    try {
        let perPage = 10
        const query = QueryString.stringify(req.query).replace(/%20/g, '+');
        let response = await req.WooCommerce.get(`orders?per_page=${perPage}&${query}`)
        response = wcReturn(response)
        if (response.pages > 1) {
            for (let x = 2; x <= response.pages; x++) {
                let newResponse = await req.WooCommerce.get(`orders?page=${x}&per_page=${perPage}&${query}`)
                newResponse = wcReturn(newResponse)
                response.data = response.data.concat(newResponse.data)
            }
        }
        response.data = response.data.filter(resp => resp.customer_id != 0)
        response.items = response.data.length
        response.pages = Math.ceil(response.data.length / perPage)
        return res.send(response)
    } catch (error) {
        res.status(400).json(error.response.data)
    }
}