import req from './request';
import Settings from 'config';

const API = {
  path: Settings.api.path,
  state: {
    index (options={}) {
      const url = `${API.path}/state`;
      return req(url, options);
    }
  },
  orders: {
    create (params={}) {
      const payload = JSON.stringify({order: params});
      return req(`${API.path}/orders`, {method: 'POST', body: payload});
    },
    get (uuid) {
      const url = `${API.path}/orders/${uuid}`;
      return req(url);
    },
    pay (uuid) {
      const url = `${API.path}/orders/${uuid}/pay`;
      return req(url);
    }
  },
  feedbacks: {
    create (params={}) {
      const payload = JSON.stringify({feedback: params});
      return req(`${API.path}/feedbacks`, {method: 'POST', body: payload});
    }
  }
}

export default API;
