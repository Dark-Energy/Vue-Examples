import Vue from 'vue'
import _ from './utils.js'
import * as mlib from './lib.js'

import Vue_App from './run.js'


import App from './Test_App.vue'


var app = new Vue({
  el: '#app',
  render: h => h(App)
})
