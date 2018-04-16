const baseUrl = 'http://localhost:3100';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.status = response.status;
  throw error;
}

function parseJSON(response) {
  return response.json();
}

export default function (url, options = {}) {
  if (!options || !options.method) {
    options.method = 'GET';
  }
  if (options && options.body) {
    options.headers = {
      'Content-Type': 'application/json',
    };
    options.body = JSON.stringify(options.body);
  }
  options.credentials = 'include';
  return fetch(baseUrl + url, options)
    .then(checkStatus)
    .then(parseJSON);
}
