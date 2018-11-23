import 'isomorphic-fetch'

const req = (url, options = {}) => {
  const reqOptions = {
    ...options,
    mode: 'cors',
    headers: {
      ...options.headers,
      'Accept': '*/*',
      'Access-Control-Allow-Origin': '*',
    }
  }

  if (typeof options.body === 'string') {
    reqOptions.headers = {
      ...reqOptions.headers,
      'Content-Type': 'application/json',
    }
  }
  return fetch(url, reqOptions).then(parseStatus).then(parseJson).catch(parseJson);
}

class CustomError {
  constructor (errorResponse) {
    this.errors = {
      [errorResponse.type]: errorResponse.statusText,
      response: errorResponse
    }
  }
}

const parseStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(response)
  }
}

const parseJson = (response) => {
  return new Promise((resolve, reject) => {
    response.json().then(data => {
      if (response.status < 300) {
        resolve(data);
      } else {
        reject({...data, ...response});
      }
    })
    .catch(e => {
      reject(new CustomError(response));
    })
  })
}

export default req;
