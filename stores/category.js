import {types, getRoot} from 'mobx-state-tree';
import * as _ from 'lodash';
import {limit, all_exclude} from 'utils/settings';

const Category = types
  .model("Category", {
    id: types.identifierNumber,
    title: types.maybeNull(types.string),
    slug: types.maybeNull(types.string),
    description: types.maybeNull(types.string),
    page: types.optional(types.number, 1)
  })
  .views(self => {
    return {
      get url () {
        return `/${self.slug}`;
      },
      get pageProductItems () {
        return self.productItems.slice(0, self.page * limit);
      },
      get productItems () {
        const root = getRoot(self);
        
        return _.map(
          _.groupBy(
            root.product_items
              .filter(pi => self.slug == 'all' ? 
                !all_exclude.includes(pi.product.category.slug) : 
                pi.product.category_id == self.id),
            'uniqId'
          ), g => _.minBy(g, 'price')
        );
      },
      get productItemsShowed () {
        return self.productItems.length === self.pageProductItems.length; 
      }
    };
  })
  .actions(self => {
    return {
      toNextPage () {
        self.page++;
      }
    }
  })

export default Category
