import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { supabase } from '@/lib/supabaseClient'

// Check if supabase find an authenticated session
const isAuthenticated = async (to, from) => {
  console.log('to: ', to)
  console.log('from: ', from)
  if (to.hash.startsWith('#access_token')) {
    return '/registrationcompleted'
  }

  const { data, error } = await supabase.auth.getSession()
  console.log('data: ', data)
  console.log('error: ', error)

  if (!data.session) {
    return '/auth'
  }
  return true
}

const isSkipAuth = async (to, from) => {
  const { data, error } = await supabase.auth.getSession()
  console.log('data: ', data)
  console.log('error: ', error)

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
      beforeEnter: isSkipAuth,
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: '/auth',
      name: 'auth',
      beforeEnter: isSkipAuth,
      component: () => import('@/views/AuthView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      beforeEnter: isAuthenticated,
      component: () => import('@/views/DashboardView.vue')
    },
    {
      path: '/project',
      name: 'project',
      beforeEnter: isAuthenticated,
      component: () => import('@/views/ProjectView.vue')
    },
    {
      path: '/task',
      name: 'task',
      beforeEnter: isAuthenticated,
      component: () => import('@/views/TaskView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      beforeEnter: isAuthenticated,
      component: () => import('@/views/ProfileView.vue')
    },
    {
      path: '/registrationcompleted',
      name: 'registrationcompleted',
      component: () => import('@/views/RegistrationCompletedView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      beforeEnter: isAuthenticated,
      component: () => import('@/views/NotFoundView.vue')
    }
  ]
})

export default router
