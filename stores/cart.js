import {types, applySnapshot, getRoot, destroy} from 'mobx-state-tree';
import CartItem from './cart_item';
import Order from './order';
import API from 'utils/api';
import {Router} from 'routes';

const Cart = types
  .model("Cart", {
    items: types.array(CartItem),
    order: types.maybeNull(Order)
  })
  .views(self => {
    return {
      get cartKey () {
        return 'cartData';
      },
      get itemsCount () {
        return self.items.map(i => i.quantity).reduce((a, b) => a + b, 0);
      },
      get total () {
        return self.items.map(i => i.productItem.price * i.quantity).reduce((a, b) => a + b, 0);
      }
    };
  })
  .actions(self => {
    return {
      init () {
        const data = JSON.parse(localStorage.getItem(self.cartKey));
        const root = getRoot(self);
        try {
          applySnapshot(self, data);
        } catch (e) {
          console.error(e);
          applySnapshot(self, {items: [], order: null});
        }
        self.items = self.items.filter(item => root.findProductItem(item.product_item_id));
        console.log(self.toJSON());
      },
      add (productItemId) {
        const item = self.items.find(i => i.product_item_id == productItemId);
        if (item) {
          item.quantity = item.quantity + 1;
        } else {
          self.items = self.items.concat({quantity: 1, product_item_id: productItemId});
        }
        self.backup();
      },
      remove (productItemId) {
        const item = self.items.find(i => i.product_item_id == productItemId);
        item && destroy(item);
        self.backup();
      },
      clear () {
        self.items = [];
        self.order = null;
        self.backup();
      },
      backup () {
        localStorage.setItem(self.cartKey, JSON.stringify(self.toJSON()));
      },
      buildOrder () {
        self.order = Order.create();
        self.backup();
      },
      saveOrderSuccess (order) {
        const root = getRoot(self);
        
        self.clear();
        Router.pushRoute(`/order/${order.uuid}`);
      },
      saveOrder () {
        const params = {
          first_name: self.order.first_name,
          last_name: self.order.last_name,
          phone: self.order.phone,
          email: self.order.email,
          description: self.order.description,
          delivery: self.order.delivery,
          address: self.order.address,
          payment_type: self.order.payment_type,
          order_items: self.items
        }
        return new Promise((resolve, reject) => {
          return API.orders.create(params)
            .then(res => {
              self.saveOrderSuccess(res);
              resolve(res);
            })
            .catch(error => {
              reject(error);
            })
        })
      }
    };
  })


export default Cart
