import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Find from '@/components/Find.vue'
import { InputGroup } from 'bootstrap-vue/es/components'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(InputGroup)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    { path: '/find', component: Find }
  ]
})
