import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { supabase } from '../../lib/supabaseClient'

// Check if supabase find an authenticated session
const isAuthenticated = async (to, from) => {
  console.log('to: ' , to)
  console.log('from: ' , from)
  if(to.hash.startsWith('#access_token')) {
    return '/registrationcompleted'
  }
  // reject the navigation
  const { data, error } = await supabase.auth.getUser()
  console.log('data: ' , data)
  console.log('error: ' , error)
  if(error || data.user === undefined) {
    console.log('exit')
    return '/auth'
  }
  return true
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/auth',
      name: 'auth',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AuthView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      beforeEnter: isAuthenticated,
      component: () => import('../views/DashboardView.vue')
    }, 
    {
      path: '/registrationcompleted',
      name: 'registrationcompleted',
      component: () => import('../views/RegistrationCompletedView.vue')
    },
    {
      path: '/logout',
      name: 'logout',
      beforeEnter: async (to, from) => {
        let error = await supabase.auth.signOut()
        console.log('error: ' , error)
        if(error.error) {
          alert('error: ' + error.message)
          return false
        }
        return '/'
      }
    }
  ]
})

export default router
