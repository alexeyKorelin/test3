import {types} from 'mobx-state-tree';
import Home from './home';
import Category from './category';

const Pages = types
  .model('Pages', {
    home: types.maybeNull(Home),
    category: types.maybeNull(Category)
  })
  .preProcessSnapshot(snapshot => {
    return {
      ...snapshot,
      home: Home.create(),
      category: Category.create()
    }
  })
  .views(self => {
    return {

    };
  })

export default Pages
