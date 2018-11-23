const routes = module.exports = require('next-routes')();

routes
  .add('index')
  .add('faq')
  .add('cart')
  .add('/order/:order', 'order')
  .add('/:category', 'category')
  .add('/:category/:product', 'product')
  .add('/:category/:product/:product_item', 'product_item');
