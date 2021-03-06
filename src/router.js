import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Dashboard from './views/Dashboard.vue'
import DashboardAccountDetails from './views/dashboard/AccountDetails.vue'
import DashboardWardrobe from './views/dashboard/Wardrobe.vue'
import DashboardAbout from './views/dashboard/About.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/dashboard',
      component: Dashboard,
      children: [
        {
          path: '',
          redirect: 'account-details',
          component: DashboardAccountDetails
        },
        {
          path: 'account-details',
          name: 'dashboard-account-details',
          component: DashboardAccountDetails
        },
        {
          path: 'my-wardrobe',
          name: 'dashboard-wardrobe',
          component: DashboardWardrobe
        },
        {
          path: 'about',
          name: 'dashboard-about',
          component: DashboardAbout
        }
      ]
    }
  ]
})
