import {types} from 'mobx-state-tree';
import Questions from '../modules/questions';

const Category = types
  .model('Category', {
    questions: types.maybeNull(Questions)
  })
  .preProcessSnapshot(snapshot => {
    return {
      ...snapshot,
      questions: Questions.create()
    }
  })
  .views(self => {
    return {

    };
  })

export default Category
