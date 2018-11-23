import {types, getRoot} from 'mobx-state-tree';
import * as _ from 'lodash';
import {Router} from 'routes';
import Image from './image';

const ProductItem = types
  .model('ProductItem', {
    id: types.identifierNumber,
    size: types.maybeNull(types.string),
    colors: types.frozen(),
    price: types.maybeNull(types.number),
    images: types.array(Image),
    product_id: types.maybeNull(types.number)
  })
  .views(self => {
    return {
      get uniqId () {
        return `${self.product_id}${self.colors.map(c => c.code).join('_')}`;
      },
      get product () {
        const root = getRoot(self);
        return root.products.find(c => c.id == self.product_id);
      },
      get category () {
        return self.product.category;
      },
      get url () {
        return `${self.product.url}/${self.id}`
      },
      get avatar () {
        return self.images[self.images.length - 1]; // can be null
      },
      get sizes () {
        return _.uniq(_.sortBy(self.product.productItems, 'price').map(item => item.size));
      },
      get colorsGroups () {
        return _.uniqWith(self.product.productItems.map(item => item.colors), _.isEqual);
      },
      get productItems () {
        return self.product.productItems;
      }
    };
  })
  .actions(self => {
    return {
      addToCart () {
        const cart = getRoot(self).cart;
        cart.add(self.id);
      },
      checkColors (colors) {
        return self.productItems.find(item => self.size === item.size && _.isEqual(item.colors, colors)) !== undefined;
      },
      goSize (size) {
        const items = self.productItems.filter(item => (item.size === size && item.size != self.size));
        const item = items.find(item => _.isEqual(self.colors, item.colors));

        if (items.length > 0) Router.pushRoute(`${self.product.url}/${item !== undefined && item.id || items[0].id}`);
      },
      goColors (colors) {
        Router.pushRoute(`${self.product.url}/${self.productItems.find(item => item.size === self.size && isEqual(item.colors, colors)).id}`);
      },
      loadImages () {
        self.images.forEach(image => {
          image.startLoad();
        });
      }
    };
  })

export default ProductItem
