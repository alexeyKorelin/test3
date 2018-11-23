import {types, getRoot} from "mobx-state-tree"

const Product = types
  .model("Product", {
    id: types.identifierNumber,
    title: types.maybeNull(types.string),
    slug: types.maybeNull(types.string),
    description: types.maybeNull(types.string),
    category_id: types.maybeNull(types.number),
    advice_ids: types.frozen()
  })
  .views(self => {
    return {
      get category () {
        const root = getRoot(self);
        return root.categories.find(c => c.id == self.category_id);
      },
      get url () {
        return `/${self.category.slug}/${self.slug}`
      },
      get productItems () {
        const root = getRoot(self);
        return root.product_items.filter(p => p.product_id == self.id);
      },
      get adviced () {
        const root = getRoot(self);
        return root.products
          .filter(p => self.advice_ids.includes(p.id))
          .reduce((acc, product) => acc.concat(product.productItems), []);
      },
      get colors () {
        return self.productItems();
      }
    };
  })

export default Product
