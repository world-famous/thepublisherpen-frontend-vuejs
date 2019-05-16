/* eslint-disable no-undef */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
import axios from 'axios'
import CONF from '@/config/config.js'

const apiBase = CONF.prod.apiBase

export default {
  getCategories: () => {
    return axios.get(apiBase + '/categories')
  },
  uploadFile: (file, type) => {
    let formData = new FormData()
    formData.append('file', file)
    formData.append('type', type)
    return axios.post(apiBase + '/upload-media',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
  },
  addOrUpdateUser: (user) => {
	  return axios.post(apiBase + '/users/add-update', user)
  },
  newPost: (post) => {
	  return axios.post(apiBase + '/posts/add', post)
  },
  getAllPosts: () => {
	  return axios.get(apiBase + '/posts/all')
  },
  getMyPosts: (uid) => {
	  return axios.get(apiBase + '/posts/' + uid)
  },
  getPost: (id) => {
	  return axios.get(apiBase + '/post/' + id)
  },
  getRelatedPosts: (category) => {
	  return axios.get(apiBase + '/posts/related/' + category)
  },
  getVisitorCountry: () => {
	  return $.getJSON('https://api.db-ip.com/v2/free/self')
  },
  getTrendsByPost: (pid) => {
	  return axios.get(apiBase + '/trends/' + pid)
  },
  getTrendsByAuthor: (uid) => {
	  return axios.get(apiBase + '/trends/u/' + uid)
  },
  getTrendsTotalByPost: (pid) => {
	  return axios.get(apiBase + '/trends/total/' + pid)
  },
  getTrendsTotalByAuthor: (uid) => {
	  return axios.get(apiBase + '/trends/total/u/' + uid)
  },
  incTrends: (pid, fld) => {
	  return axios.post(apiBase + '/trends/inc', {pid, fld})
  },
  decTrends: (pid, fld) => {
	  return axios.post(apiBase + '/trends/dec', {pid, fld})
  },
  getCurrentEarning: (uid) => {
	  return axios.get(apiBase + '/wallet/' + uid)
  },
  getTotalEarning: (uid) => {
	  return axios.get(apiBase + '/wallet/total/' + uid)
  },
  getLastPaidDate: (uid) => {
	  return axios.get(apiBase + '/wallet/ldt/' + uid)
  },
  requestPayment: (payment) => {
	  return axios.post(apiBase + '/payments/create', payment)
  },
  checkIfPending: (uid) => {
	  return axios.get(apiBase + '/payments/checkpending/' + uid)
  }
}
