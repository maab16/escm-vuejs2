import axios from 'axios'
import store from '@/store'

let http = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    'Content-type': 'application/json'
  }
})

// http.defaults.withCredentials = true

// Request interceptor
http.interceptors.request.use(request => {
  const token = store.getters['user/token']
  if (token) {
    request.headers.common.Authorization = `Bearer ${token}`
  }
  return request
})

// import { http } from './route.class'
// require('./routes')

class Storage {
  get (endpoint, id = null) {
    let results = localStorage.getItem(endpoint) != null
      ? JSON.parse(localStorage.getItem(endpoint))
      : []
    if (id) {
      results = results.filter(result => result.id === id)
    }
    return results
  }
  post (endpoint, data = []) {
    localStorage.setItem(endpoint, JSON.stringify(data))
    return data
  }
  put (endpoint, data) {
    let results = this.get(endpoint)
    results = results.map(result => {
      if (result.id === data.id) {
        return {...data}
      }
      return result
    })
    localStorage.setItem(endpoint, JSON.stringify(results))
    return data
  }
}

export let storage = new Storage()

export default http
