import store from '../store'

export default async (to, from, next) => {
  if (!store.getters['user/check']) {
    next({ name: 'login' })
  } else {
    next()
  }
}
