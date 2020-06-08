const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;

let wcPermission = async (req, res, next) => {
    const WooCommerce = new WooCommerceRestApi({
        url: 'https://foodnwood.nl/',    //req.user.store.url,
        consumerKey: 'ck_6e6cf60762e8b672c5712a50a732ec2a8f1be0ae',     //req.user.wooCommerceApiKeys.consumer_key,
        consumerSecret: 'cs_4f775c4307e247211df66b0dd64f11e85210e277',     //req.user.wooCommerceApiKeys.consumer_secret,
        version: 'wc/v3'
    });
    req.WooCommerce = WooCommerce
    next()
}

module.exports = { wcPermission }