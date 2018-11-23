import {types} from 'mobx-state-tree';

const Questions = types
  .model('Questions', {
    active: types.maybeNull(types.number)
  })
  .views(self => {
    return {
    };
  })
  .actions(self => ({
    toggle (i) {
      self.active = (self.active === i) ? null : i;
    }
  }));

export default Questions;
