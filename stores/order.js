import {types, applySnapshot} from 'mobx-state-tree';
import CartItem from './cart_item';
import API from 'utils/api';

const Order = types
  .model("Order", {
    uuid: types.maybeNull(types.string), // for order page
    status: types.maybeNull(types.string), // for order page
    payment_status: types.maybeNull(types.string), // for order page
    amount: types.maybeNull(types.number), // for order page
    items: types.array(CartItem), // for order page
    fetched: types.optional(types.boolean, false), // for order page
    first_name: types.optional(types.string, ''),
    // last_name: types.optional(types.string, ''),
    phone: types.optional(types.string, ''),
    email: types.optional(types.string, ''),
    description: types.optional(types.string, ''),
    delivery: types.optional(types.string, 'courier'),
    address: types.optional(types.frozen(), {}),
    payment_type: types.optional(types.string, 'cash')
  })
  .preProcessSnapshot(snapshot => {
    if (snapshot) {
      const newSnapshot = {
        ...snapshot,
        items: snapshot.order_items
      }
      return newSnapshot
    }
  })
  .views(self => {
    return {
      get total () {
        return self.items.map(i => i.productItem.price * i.quantity).reduce((a, b) => a + b, 0);
      }
    };
  })
  .actions(self => {
    return {
      applyChanges (options={}) {
        for (let key in options) {
          self[key] = options[key];
        }
      },
      fetch (uuid) {
        return new Promise((resolve, reject) => {
          return API.orders.get(uuid)
            .then(res => {
              applySnapshot(self, res);
              self.fetchSuccess();
              resolve(res);
            }).catch(error => {
              self.fetchSuccess();
              reject(error);
            })
        })
      },
      fetchSuccess () {
        self.fetched = true;
      },
      pay () {
        return new Promise((resolve, reject) => {
          return API.orders.pay(self.uuid)
            .then(res => {
              if (res.url) {
                window.location = res.url;
              } else {
                alert('Please, try again!');
                reject(res);
              }
            }).catch(error => {
              alert('Please, try again!');
              reject(error);
            })
        })
      }
    };
  })

export default Order
