import Vue from 'vue'
import store from '../store'
import Meta from 'vue-meta'
import routes from './routes'
import Router from 'vue-router'
import { sync } from 'vuex-router-sync'

Vue.use(Meta)
Vue.use(Router)

// The middleware for every page of the application.
const globalMiddleware = ['check-auth']

// Load middleware modules dynamically.
const routeMiddleware = {}
const middlewareContext = require.context('../middleware', false, /.*\.js$/)

middlewareContext.keys()
  .map(file => {
    const middlewareName = file.replace(/(^.\/)|(\.js$)/g, '')
    const middlewareModule = middlewareContext(file)
    routeMiddleware[middlewareName] = middlewareModule.default
  })

const router = new Router({
  scrollBehavior,
  mode: 'history',
  routes
})

router.beforeEach(beforeEach)
router.afterEach(afterEach)

sync(store, router)

export default router

/**
 * Global router guard.
 *
 * @param {Route} to
 * @param {Route} from
 * @param {Function} next
 */
async function beforeEach (to, from, next) {
  let components = []
  try {
    // Get the matched components and resolve them.
    const matchedComponents = router.getMatchedComponents({ ...to })
    components = await Promise.all(
      matchedComponents.map(component => {
        return typeof component === 'function' ? component() : component
      }))
  } catch (error) {
    if (/^Loading( CSS)? chunk (\d)+ failed\./.test(error.message)) {
      window.Location.reload(true)
      return
    }
  }

  if (components.length === 0) {
    return next()
  }
  // Start the loading bar.
  if (components[components.length - 1].loading !== false) {
    // router.app.$nextTick(() => router.app.$loading.start())
  }
  // Call each middleware.
  callMiddleware(getMiddleware(components), to, from, (...args) => {
    // Set the application layout only if "next()" was called with no args.
    if (args.length === 0) {
      // router.app.setLayout(components[0].layout || '')
    }

    next(...args)
  })
}

/**
 * Global after hook.
 *
 * @param {Route} to
 * @param {Route} from
 * @param {Function} next
 */
async function afterEach (to, from, next) {
  await router.app.$nextTick()

  // router.app.$loading.finish()
}

/**
 * Call each middleware.
 *
 * @param {Array} middleware
 * @param {Route} to
 * @param {Route} from
 * @param {Function} next
 */
function callMiddleware (middlewares, to, from, next) {
  const stack = middlewares.reverse()

  const _next = (...args) => {
    // Stop if "_next" was called with an argument or the stack is empty.
    if (args.length > 0 || stack.length === 0) {
      if (args.length > 0) {
        // router.app.$loading.finish()
      }

      return next(...args)
    }

    const middleware = stack.pop()

    if (typeof middleware === 'function') {
      middleware(to, from, _next)
    } else if (routeMiddleware[middleware]) {
      routeMiddleware[middleware](to, from, _next)
    } else {
      throw Error(`Undefined middleware [${middleware}]`)
    }
  }

  _next()
}

/**
 * Merge the the global middleware with the components middleware.
 *
 * @param  {Array} components
 * @return {Array}
 */
function getMiddleware (components) {
  let middlewares = [...globalMiddleware]

  components.filter(c => c.middleware).forEach(component => {
    if (Array.isArray(component.middleware)) {
      middlewares.push(...component.middleware)
    } else {
      middlewares.push(component.middleware)
    }
  })

  return middlewares
}

/**
 * Scroll Behavior
 *
 * @link https://router.vuejs.org/en/advanced/scroll-behavior.html
 *
 * @param  {Route} to
 * @param  {Route} from
 * @param  {Object|undefined} savedPosition
 * @return {Object}
 */
function scrollBehavior (to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  }

  if (to.hash) {
    return { selector: to.hash }
  }

  const [component] = router.getMatchedComponents({ ...to }).slice(-1)

  if (component && component.scrollToTop === false) {
    return {}
  }

  return { x: 0, y: 0 }
}
