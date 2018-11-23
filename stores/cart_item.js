import {types, getRoot} from 'mobx-state-tree';

const CartItem = types
  .model("CartItem", {
    product_item_id: types.number,
    quantity: types.number
  })
  .views(self => {
    return {
      get productItem () {
        const root = getRoot(self);
        return root.product_items.find(p => p.id == self.product_item_id);
      },
      get total () {
        return self.productItem.price * self.quantity;
      }
    };
  })
  .actions(self => {
    return {
      setQuantity(quantity) {
        const root = getRoot(self);

        self.quantity = parseInt(quantity);
        root.cart.backup();
      }
    }
  })

export default CartItem
