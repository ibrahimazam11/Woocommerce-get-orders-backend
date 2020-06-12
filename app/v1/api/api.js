const express = require('express')
const apiRoutes = express.Router()
const { auth } = require('../middleware/auth');
const { wcPermission } = require('../middleware/wcPermission');
const OrderController = require('../controllers/orders');

apiRoutes.post('/wc/login', OrderController.login)

/**** Orders ****/
apiRoutes.get('/wc/order/all', auth, wcPermission, OrderController.getAll)
apiRoutes.get('/wc/order/:orderId/notes', auth, wcPermission, OrderController.notes)
apiRoutes.get('/wc/order/customer', auth, wcPermission, OrderController.getCustomerOrders)

module.exports = apiRoutes
