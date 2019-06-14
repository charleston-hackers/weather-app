import Vue from 'vue'
import Router from 'vue-router'
import FiveDayForecast from '../components/FiveDayForecast.vue'
import CurrentForecast from '../components/CurrentForecast.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CurrentForecast',
      component: CurrentForecast
    },
    {
      path: '/5-Day-Forecast',
      name: 'FiveDayForecast',
      component: FiveDayForecast
    },
    {
      path: '*',
      component: CurrentForecast
    }
  ],
    mode: 'history'
})
