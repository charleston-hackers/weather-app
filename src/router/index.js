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
      component: CurrentForecast,
      meta: {
        title: 'Current Weather | Local forecast by zip code',
        metaTags: [
          {
            name: 'description',
            content: 'Get the current weather forecast by zip code.'
          }
        ]
      }
    },
    {
      path: '/5-Day-Forecast',
      name: 'FiveDayForecast',
      component: FiveDayForecast,
      meta: {
        title: '5 Day Forecast | Local 5 day forecast by zip code',
        metaTags: [
          {
            name: 'description',
            content: 'Get 5 day weather forecast by zip code.'
          }
        ]
      }
    }
  ],
  mode: 'history'
})
