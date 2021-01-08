import {storage} from '@/app/services/httpClient.js'
import User from '@/Modules/User/user.model'
import RoleUser from '@/Modules/RoleUser/role-user.model'
import Organization from '@/Modules/Organization/organization.model'
import RoleUserEntity from '@/Modules/RoleUser/role-user.entity'
import OrganizationEntity from '@/Modules/Organization/organization.entity'
import NotificationEntity from '@/Modules/Notification/notification.entity'
import TokenService from '@/Modules/Token/token.service'
import jwt from 'jsonwebtoken'
import store from '@/store'

const ENDPOINT = 'users'
const PRIVATE_KEY = process.env.PRIVATE_KEY
const TOKEN_EXPIRES = process.env.TOKEN_EXPIRES

class UserEntity {
  all () {
    return storage.get(ENDPOINT)
  }
  store (data) {
    return storage.post(ENDPOINT, data)
  }
  verifyInternalUser (params) {
    let {email} = params
    return User.query().where('email', email).exists() ? {success: true} : {success: false}
  }
  verifyCustomerUser (params) {
    let email = params.email
    let organizationEmail = params.organization_email
    let user = User.query().withAllRecursive().where('email', email).first()
    if (user && user.organization.email === organizationEmail) {
      return {
        success: true
      }
    }
    return {
      success: false
    }
  }
  sendOTP (data) {
    let {email, otp} = data

    User.insert({data: this.all()})

    let user = User.query().where('email', email).first()
    NotificationEntity.send('otp', {
      email: user.email,
      fname: user.fname,
      lname: user.lname,
      otp: otp,
      company_name: 'eSCM',
      reply_to: 'no-reply@escm.com'
    })
  }
  get (id) {
    return storage.get(ENDPOINT, id)
  }
  getByEmail (email) {
    return User.query().with('organization').where('email', email).first()
  }
  getMaxId () {
    return User.query().max('id')
  }
  create (data) {
    let users = this.all()
    let roleUsers = RoleUserEntity.all()
    let organizations = OrganizationEntity.all()

    Organization.insert({data: organizations})

    let organization = Organization.query().where('email', data.organization_email).first()
    let userId = this.getMaxId() > 0 ? this.getMaxId() + 1 : 1

    users.push({
      id: userId,
      organization_id: organization.id,
      email: data.email,
      fname: data.fname,
      lname: data.lname,
      mobile: data.mobile
    })

    roleUsers.push({
      id: RoleUser.query().max('id') > 0 ? RoleUser.query().max('id') + 1 : 1,
      user_id: userId,
      role_id: 6
    })

    this.store(users)
    RoleUserEntity.store(roleUsers)
    RoleUser.insert({data: roleUsers})
    User.insert({data: users})
    return {
      success: true
    }
  }
  login (data) {
    if (Number(data.otp) === Number(store.getters['user/getOTP'])) {
      var token = jwt.sign({ email: data.email }, PRIVATE_KEY, {expiresIn: TOKEN_EXPIRES})
      let user = User.query().withAll().where('email', data.email).first()
      TokenService.create(user.id, token)
      return {
        success: true,
        user: user,
        token: token
      }
    }
  }
  getUserByToken (params) {
    if (params.user) {
      return params.user
    }
    return null
  }
}

export default new UserEntity()
