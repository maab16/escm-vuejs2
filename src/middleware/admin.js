import store from '../store'

export default (to, from, next) => {
  let user = store.getters['user/user']
  if (user) {
    let isRole = false
    for (let role of user.roles) {
      if (role.name === 'Admin_Security_Default' ||role.name === 'admin_Security_Default' || role.name === 'SuperAdmin_Security_Default') {
        isRole = true
      }
    }

    if (!isRole) {
      next({ name: 'home' })
    } else {
      next()
    }
  } else {
    next({ name: 'login' })
  }
}
