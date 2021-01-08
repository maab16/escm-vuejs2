import store from '../store'

export default (to, from, next) => {
  if (store.getters['user/check']) {
    console.log('check')
    next({ name: 'home' })
  } else {
    next()
  }
}
