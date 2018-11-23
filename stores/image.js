import {types, getRoot} from 'mobx-state-tree';
import {isSm} from 'utils/utils';

const ProductImage = types
  .model('Image', {
    id: types.identifierNumber,
    url: types.maybeNull(types.string),
    mid: types.maybeNull(types.string),
    thumb: types.maybeNull(types.string),
    urlLoad: types.optional(types.boolean, false),
    midLoad: types.optional(types.boolean, false),
    thumbLoad: types.optional(types.boolean, false)
  })
  .views(self => {
    return {

    };
  })
  .actions(self => {
    return {
      startLoad () {
        if (!self.midLoad) {
          let mid = new Image();

          mid.onload = function () {
            if (!isSm() && !self.urlLoad) {
              let url = new Image();
              
              url.onload = self.endLoad('url');
              url.src = self.url;
            }

            self.endLoad('mid');
          }
          mid.src = self.mid;
        }

        if (!self.thumbLoad) {
          let thumb = new Image();
          
          thumb.onload = self.endLoad('thumb');
          thumb.src = self.thumb;
        }       
      },
      endLoad (kind) {
        self[`${kind}Load`] = true;
      }
    };
  })

export default ProductImage
