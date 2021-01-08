import http from '@/app/services/httpClient.js'
import UserEntity from './user.entity'
import axios from 'axios'
import store from '@/store'

const ENDPOINT = 'users'

class UserService {
  async verifyInternalUser (email) {
    let response = await http.get('internal/verify/' + email)
    return response.data
  }
  async verifyCustomerUser (payload) {
    let response = await http.get(ENDPOINT + '/verify/' + payload.email, { params: {organization_email: payload.organization_email} })
    console.log(response)
    return response.data
  }
  async sendOTP (email, otp) {
    // let response = await http.post('/otp/send', {email, otp})
    // return response.data

    return UserEntity.sendOTP({email, otp})
  }
  async createUser (data) {
    await http.post('/register', data)
  }
  async login (data) {
    console.log(data)
    try {
      let response = await http.post('/otp/login', data)
      return response.data
    } catch (err) {
      window.toastr.error(err.response.data.message)
      console.log(err.response.data.message)
    }
  }
  async resendOTP (data) {
    try {
      let response = await http.post('/otp/resend', data)
      return response.data
    } catch (err) {
      window.toastr.error(err.response.data.message)
      console.log(err.response.data.message)
    }
    return null
  }
  async getUserByToken () {
    try {
      let response = await http.get(ENDPOINT + '/fetch')
      return response.data
    } catch (err) {
      window.toastr.error(err.response.data.message)
      return null
    }
  }
  async getTerms (type) {
    let response = await http.get('terms/' + type)
    return response.data
  }
  async download (type) {
    let response = await http.get('terms/download/' + type, {responseType: 'blob'})
    return response
  }
}

export default new UserService()
