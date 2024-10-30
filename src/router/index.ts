import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/AuthPages/LoginView.vue'
import RegisterView from '../views/AuthPages/RegisterView.vue'
import { useUserStore } from '@/stores/userStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        requiresGuest: true
      }
    },
  ]
})

router.beforeEach(async (to, from, next) => {
  const userData = useUserStore()
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Route requires authentication
    if (!userData.tokenContent?.exp || new Date().getTime() > userData.tokenContent.exp * 1000) {
      // User not logged in, redirect to login page
      try {
        await userData.refreshToken()
        if (userData.accessToken?.length === 0) {
          next({ name: 'login' })
        } else {
          next()
        }
      } catch {
        next({ name: 'login' });
      }
    } else {
      // User logged in, proceed to the route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    try {
      await userData.refreshToken()
      if (userData.accessToken?.length !== 0) {
        next()
      } else {
        next()
      }
    } catch {
      next({ name: 'Login' })
    }
  } else {
    // No specific requirements for the route, proceed to the route
    next();
  }

})

export default router
