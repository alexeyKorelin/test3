import {types} from 'mobx-state-tree';
import Pages from './pages';

const UI = types
  .model('UI', {
    pages: types.maybeNull(Pages),
    action: types.maybeNull(types.string)
  })
  .preProcessSnapshot(snapshot => {
    return {
      ...snapshot,
      pages: Pages.create()
    }
  })
  .actions(self => {
    return {
      setAction (action) {
        self.action = action;
      },
      closeModal () {
        self.action = null;
      }
    };
  })
  .views(self => {
    return {

    };
  })

export default UI
