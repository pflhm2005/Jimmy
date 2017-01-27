console.clear();

var Vue = require('vue')
import VueRouter from 'vue-router'
var App = require('./vue/index.vue')
require('./lib/bootstrap/css/bootstrap.min.css')
require('./base.css')

Vue.use(VueRouter)

new Vue({
  el: '#index',
  render: h => h(App)
})

