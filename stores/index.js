import { types, applySnapshot } from 'mobx-state-tree';
import Category from './category.js';
import Product from './product.js';
import Cart from './cart.js';
import Order from './order.js';
import Feedback from './feedback.js';
import ProductItem from './product_item';
import UI from './UI';

let store = null

const Store = types
  .model({
    categories: types.array(Category),
    products: types.array(Product),
    product_items: types.array(ProductItem),
    cart: types.maybeNull(Cart), // для хранения корзины
    order: types.maybeNull(Order), // для страницы заказа (после успешной оплаты)
    feedback: types.maybeNull(Feedback),
    ui: types.maybeNull(UI)
  })
  .preProcessSnapshot(snapshot => {
    if (snapshot && snapshot.categories && snapshot.categories.find(c => c.id === 0) === undefined) {
      const all = Category.create({id: 0, title: 'Все', slug: 'all'});
      let categories = [all];

      return {
        ...snapshot,
        categories: categories.concat(snapshot.categories)
      }
    } else {
      return snapshot;
    }
  })
  .actions((self) => {
    return {
      findCategory (slug) {
        console.log(slug)
        return self.categories.find(c => c.slug == slug);
      },
      findProduct (slug) {
        console.log(slug)
        return self.products.find(p => p.slug == slug);
      },
      findProductItem (id) {
        console.log(id)
        return self.product_items.find(p => p.id == id);
      }
    };
  })
  .views(self => {
    return {

    }
  })
  .preProcessSnapshot(snapshot => {
    const newSnapshot = {...snapshot};
    if (!newSnapshot.cart) newSnapshot.cart = Cart.create();
    if (!newSnapshot.order) newSnapshot.order = Order.create();
    if (!newSnapshot.feedback) newSnapshot.feedback = Feedback.create();
    if (!newSnapshot.UI) newSnapshot.UI = UI.create();
    return newSnapshot;
  })

export function initStore (isServer, snapshot = null) {
  if (store === null) {
    store = Store.create();
  }
  if (snapshot) {
    applySnapshot(store, {...snapshot, cart: store.cart});
  }
  return store;
}
