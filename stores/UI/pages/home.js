import {types} from 'mobx-state-tree';
import Questions from '../modules/questions';

const Home = types
  .model('Home', {
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

export default Home
