function doFetch(method, url, body) {
  const config = { method }

  if (body) {
    config.body = JSON.stringify(body)
  }

  return fetch(url, config)
    .then((res) => {
      if (res.status !== 204) {
        return res.json()
      }
    })
    .catch((e) => console.error('error fetching: ', e))
}

const http = {
  get: doFetch.bind(null, 'GET'),
  post: doFetch.bind(null, 'POST'),
  put: doFetch.bind(null, 'PUT'),
  del: doFetch.bind(null, 'DELETE'),
}

export default http
