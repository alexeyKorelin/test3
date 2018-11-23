import { types } from 'mobx-state-tree';
import API from 'utils/api';

const Feedback = types
  .model("Feedback", {
    name: types.optional(types.string, ''),
    phone: types.optional(types.string, ''),
    comment: types.optional(types.string, ''),
    opened: types.optional(types.boolean, false),
    title: types.optional(types.string, '')
  })
  .views(self => {
    return {
      
    };
  })
  .actions(self => {
    return {
      applyChanges (options={}) {
        for (let key in options) {
          self[key] = options[key];
        }
      },
      create () {
        const params = {
          name: self.name,
          phone: self.phone,
          comment: self.comment
        }
        return new Promise((resolve, reject) => {
          return API.feedbacks.create(params)
            .then(res => {
              self.clear();
              resolve(res);
            })
            .catch(error => {
              reject(error);
            })
        })
      },
      clear () {
        self.name = '';
        self.phone = '';
        self.comment = '';
      },
      toggle (title = '', comment = '') {
        if (title) self.title = title;
        if (!self.opened) self.title = '';

        self.comment = comment;
        self.opened = !self.opened;
      }
    };
  })

export default Feedback
