import Vue from 'vue'
import VueAuthenticate from 'vue-authenticate'
import VueAxios from 'vue-axios'
import VueSocialSharing from 'vue-social-sharing'
import axios from 'axios'

import App from './App.vue'
import router from './router'
import CONF from '@/config/config.js'

import {store} from '@/store/store'

import './styles/style.scss'

Vue.use(VueSocialSharing)
Vue.use(VueAxios, axios)
Vue.use(VueAuthenticate, {
  tokenName: 'access_token',
  baseUrl: CONF.prod.apiBase,

  providers: {
    facebook: {
      clientId: CONF.prod.facebookAppId,
      redirectUri: CONF.prod.frontBase
    },
    twitter: {
      clientId: CONF.twitterAppId,
      redirectUri: CONF.prod.frontBase
    }
  }
})

Vue.config.productionTip = false

let app = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  methods: {
  },
  template: '<App/>'
})

export default app
