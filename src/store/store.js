/* eslint-disable camelcase */
/* eslint-disable no-extra-boolean-cast */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: null,
    category: null,
    sub_category: null,
    location: null,
    search_key: '',
    trend: 'hot',
    like_only: false,
    history_view: false,
    reported_only: false
  },
  getters: {
  },
  mutations: {
    SET_CATEGORY: (state, category) => {
      state.category = category
    },
    SET_SUB_CATEGORY: (state, sub_category) => {
      state.sub_category = sub_category
    },
    SET_USER: (state, user) => {
      localStorage.social_id = !!user ? user.social_id : ''
      localStorage.uid = !!user ? user.id : ''
      localStorage.username = !!user ? user.username : ''
      localStorage.avatar = !!user ? user.avatar : ''
      state.user = user
    },
    SET_LOCATION: (state, location) => {
      state.location = location
    },
    SET_TREND: (state, trend) => {
      state.trend = trend
    },
    SET_SEARCH_KEY: (state, key) => {
      state.search_key = key
    },
    TOGGLE_LIKE_ONLY: (state) => {
      state.like_only = !state.like_only
      state.history_view = false
    },
    TOGGLE_HISTORY_VIEW: (state) => {
      state.history_view = !state.history_view
      state.like_only = false
    },
    TOGGLE_REPORTED_ONLY: (state) => {
      state.reported_only = !state.reported_only
    }
  },
  actions: {
    get_tables: ({state}) => {
    }
  }
})
