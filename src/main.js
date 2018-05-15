// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import GeminiScrollbar from 'vue-gemini-scrollbar'
import myCalendar from './components/myCalendar'

// import 'vue-event-calendar/dist/style.css' //1.1.10之后的版本，css被放在了单独的文件中，方便替换
// import vueEventCalendar from 'vue-event-calendar'
// Vue.use(vueEventCalendar, {locale: 'en'}) //可以设置语言，支持中文和英文

Vue.config.productionTip = false

Vue.component('my-calendar', myCalendar)

Vue.use(GeminiScrollbar)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App},
  template: '<App/>'
})
