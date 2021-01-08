import store from '../store'

export default async (to, from, next) => {
  if (!store.getters['user/check'] && store.getters['user/token']) {
    try {
      await store.dispatch('user/fetchUser')
    } catch (e) { }
  }

  next()
}
