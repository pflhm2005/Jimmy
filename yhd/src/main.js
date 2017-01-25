console.clear();

var Vue = require('vue')
var App = require('./vue/index.vue')
require('./lib/bootstrap/css/bootstrap.min.css')
require('./base.css')



new Vue({
  el: '#index',
  render: h => h(App)
})

