import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { supabase } from '../../lib/supabaseClient'

// Check if supabase find an authenticated session
const isAuthenticated = async (to, from) => {
  console.log('to: ', to)
  console.log('from: ', from)
  if (to.hash.startsWith('#access_token')) {
    return '/registrationcompleted'
  }

  const { data, error } = await supabase.auth.getSession()
  console.log('data: ' , data)
  console.log('error: ' , error)
  
  if (!data.session) {
    return '/auth'
  }
  return true
}

const isSkipAuth = async (to, from) => {
  const { data, error } = await supabase.auth.getSession()
  console.log('data: ' , data)
  console.log('error: ' , error)
  
  if (data.session) {
    return '/dashboard'
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
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/auth',
      name: 'auth',
      beforeEnter: isSkipAuth,
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
      path: '/:pathMatch(.*)*',
      beforeEnter: isAuthenticated,
      component: () => import('../views/AboutView.vue') // TODO: Manage redirect to not found on auth user and non-auth users
    }
  ]
})

export default router
