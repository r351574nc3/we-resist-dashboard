import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './layouts/Dashboard.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path : '',
      name: 'home',
      components:{
          default: Dashboard
      }
    },
    {   path : '/dashboard',
        component: { render (c) { return c('router-view') }},
        children:[{
                path:"",
                component: Dashboard
            }]
    },
  ]
})
