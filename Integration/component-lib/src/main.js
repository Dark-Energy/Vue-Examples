import Vue from 'vue'
import * as mlib from './lib.js'


//import dynamic_link from './components/dynamic-link.vue'
//Vue.component('dynamic-link', dynamic_link);
import App from './Test_App.vue'


var app = new Vue({
  el: '#app',
  render: h => h(App)
})
