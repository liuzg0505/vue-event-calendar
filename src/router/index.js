import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Calendar from '@/components/calendar'
import useMyCalendar from '@/components/useMyCalendar'
import vueCalendar from '@/components/vuecalendar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'useMyCalendar',
      component: useMyCalendar
    },
    {
      path: '/helloworld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: Calendar
    },
    {
      path: '/usemycalendar',
      name: 'useMyCalendar',
      component: useMyCalendar
    },
    {
      path: '/vuecalendar',
      name: 'vuecalendar',
      component: vueCalendar
    }
  ]
})
