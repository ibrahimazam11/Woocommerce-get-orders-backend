exports.wcReturn = (response, deliverySort) => {

    let data = response.data, dataArr = [];
    data.map((fieldsObj) => {
        dataArr.push({
            orderId: fieldsObj.id,
            orderDate: fieldsObj.date_created,
            orderDateGMT: fieldsObj.date_created_gmt,
            firstname: fieldsObj.billing.first_name,
            lastname: fieldsObj.billing.last_name,
            email: fieldsObj.billing.email,
            shipping: {
                address1: fieldsObj.shipping.address_1,
                address2: fieldsObj.shipping.address_2,
                postCode: fieldsObj.shipping.postcode,
                city: fieldsObj.shipping.city
            },
            telephone: fieldsObj.billing.phone,
            orderStatus: fieldsObj.status,
            orderedProducts: fieldsObj.line_items,
            quantity: fieldsObj.line_items.length,
            totalOrderPrice: fieldsObj.total,
            deliveryDetails: fieldsObj.iconic_delivery_meta ? fieldsObj.iconic_delivery_meta.timestamp ? fieldsObj.iconic_delivery_meta : { timestamp: "0" } : { timestamp: "0" },
            customerNote: fieldsObj.customer_note
        })
    })

    deliverySort ? dataArr.sort((a, b) => {
        if (a.deliveryDetails.timestamp == 0) return 1
        if (b.deliveryDetails.timestamp == 0) return -1
        let result = parseInt(a.deliveryDetails.timestamp) - parseInt(b.deliveryDetails.timestamp)
        return deliverySort == 1 ? result : -result
    }) : null

    let obj = {
        data: dataArr
    };
    response.headers['x-wp-totalpages'] ? obj.pages = +response.headers['x-wp-totalpages'] : null;
    response.headers['x-wp-total'] ? obj.items = +response.headers['x-wp-total'] : null;
    return obj
}