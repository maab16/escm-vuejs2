import {storage} from '@/app/services/httpClient.js'
import Token from '@/Modules/Token/token.model'
import jwt from 'jsonwebtoken'

const ENDPOINT = 'tokens'
const PRIVATE_KEY = process.env.PRIVATE_KEY

class TokenEntity {
  all () {
    return storage.get(ENDPOINT)
  }
  store (data) {
    return storage.post(ENDPOINT, data)
  }
  saveToken (params) {
    let {userId, token} = params
    let tokens = this.all()
    tokens = tokens.map(tokenDetail => {
      if (tokenDetail && tokenDetail.user_id === userId) {
        tokenDetail.token = token
        userId = null
      }
      return tokenDetail
    })
    if (userId) {
      tokens.push({
        id: this.getMaxId() + 1,
        user_id: userId,
        token: token
      })
    }
    this.store(tokens)
    Token.insert({data: this.all()})
  }
  getTokenUser (token) {
    Token.insert({data: this.all()})
    let tokenDetails = Token.query().withAllRecursive().where('token', token).first()
    if (tokenDetails && tokenDetails.user) {
      try {
        var decoded = jwt.verify(token, PRIVATE_KEY)
        let user = tokenDetails.user
        if (decoded.email === user.email) {
          return user
        }
      } catch (err) {
        if (err && err.name === 'TokenExpiredError') {
          throw err
        }
      }
    }
    return null
  }
  getMaxId () {
    Token.insert({data: this.all()})
    return Token.query().max('id') > 0 ? Token.query().max('id') : 0
  }
}

export default new TokenEntity()
