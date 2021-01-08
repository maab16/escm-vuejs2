import store from '@/store'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import TokenEntity from '@/Modules/Token/token.entity'

let httpClient = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    'Content-type': 'application/json'
  }
})

// Request interceptor
httpClient.interceptors.request.use(request => {
  store.dispatch('loader/set', true)
  // console.log(store.getters['loader/loading'])
  const token = store.getters['user/token']
  if (token) {
    request.headers.common.Authorization = `Bearer ${token}`
  }
  return request
})

// Response interceptor
httpClient.interceptors.response.use(response => {
  return new Promise((resolve) => setTimeout(() => {
    store.dispatch('loader/set', false)
    // console.log(store.getters['loader/loading'])
    resolve(response)
  }, 1000))
})

const mock = new MockAdapter(httpClient)

class Route {
  get (path, controller, action) {
    mock.onGet(this.getPath(path)).reply((config) => {
      let response = controller[action](this.getParams(path, config))
      return [200, response]
    })
  }
  post (path, controller, action) {
    mock.onPost(this.getPath(path)).reply((config) => {
      let response = controller[action](this.getParams(path, config))
      return [200, response]
    })
  }
  put (path, controller, action) {
    mock.onPut(this.getPath(path)).reply((config) => {
      let response = controller[action](this.getParams(path, config))
      return [200, response]
    })
  }
  delete (path, controller, action) {
    mock.onDelete(this.getPath(path)).reply((config) => {
      let response = controller[action](this.getParams(path, config))
      return [200, response]
    })
  }
  getParams (path, config) {
    let user = null
    if (config.headers.Authorization) {
      let authorization = config.headers.Authorization
      if (authorization.indexOf('Bearer') > -1) {
        let token = authorization.replace('Bearer ', '')
        user = TokenEntity.getTokenUser(token)
      }
    }
    let placeholers = path.split('/').filter(match => match)
    let partials = config.url.split('/').filter(partial => partial)
    let params = {
      user: user
    }
    placeholers.map((placeholer, index) => {
      if (placeholer.indexOf(':') > -1) {
        let param = placeholer.replace(':', '')
        params[param] = partials[index]
      }
    })
    if (config.method.toLowerCase() === 'get' && config.params) {
      return {...params, ...config.params}
    }
    if (config.data && (config.method.toLowerCase() === 'post' || config.method.toLowerCase() === 'put' || config.method.toLowerCase() === 'delete')) {
      return {...params, ...JSON.parse(config.data)}
    }

    return {...params}
  }
  getPath (path) {
    return typeof path === 'string' && path.indexOf(':') > -1
      ? new RegExp(path.replace(/:\w+/g, '[^/]+'))
      : path
  }
}

export default new Route()

export let http = httpClient
