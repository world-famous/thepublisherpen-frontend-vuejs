import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Detail from '@/components/Detail'
import Profile from '@/components/Profile'

Vue.use(Router)

const router = new Router({
	mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/auth/callback',
      component: {
        template: '<div class="auth-component"></div>'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const currentUser = !!localStorage.uid
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) next('/')
  else next()
})

export default router
