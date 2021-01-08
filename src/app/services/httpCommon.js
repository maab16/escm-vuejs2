import axios from 'axios'

export default axios.create({
  baseURL: 'https://demo7335314.mockable.io/',
  headers: {
    'Content-type': 'application/json'
  }
})
