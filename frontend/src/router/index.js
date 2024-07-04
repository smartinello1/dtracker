import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { supabase } from '../../lib/supabaseClient'
import { authStore } from '@/stores/auth'

// Check if supabase find an authenticated session
const isAuthenticated = async (to, from) => {
  console.log('to: ', to)
  console.log('from: ', from)
  if (to.hash.startsWith('#access_token')) {
    return '/registrationcompleted'
  }

  const store = authStore()
  console.log('router store.isAuthenticated: ', store.isAuthenticated)

  // TODO: Manage user session not with pinia, but with supabase client
  const {
    data: { user }
  } = await supabase.auth.getUser()
  console.log('data & user: ', user)

  if (!store.isAuthenticated) {
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
      path: '/:pathMatch(.*)*',
      beforeEnter: isAuthenticated,
      component: () => import('../views/AboutView.vue') // TODO: Manage redirect to not found on auth user and non-auth users
    }
  ]
})

export default router
