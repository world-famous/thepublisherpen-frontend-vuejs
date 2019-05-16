/* eslint-disable one-var */
/* eslint-disable camelcase */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */

export default {
  addMediaToDiv (container_id, tag, src) {
    const element = document.createElement(tag)
    if (tag === 'video') {
	  element.autoplay = true
	  element.controls = true
    }
    element.src = src
    element.setAttribute('width', '100%')

    const target = document.getElementById(container_id)
    target.appendChild(element)
    this.addBrToDiv(container_id)
    this.addParagraphToDiv(container_id)
  },
  addBrToDiv (container_id) {
    document.getElementById(container_id).appendChild(document.createElement('br'))
  },
  addParagraphToDiv (container_id) {
    document.getElementById(container_id).appendChild(document.createElement('p'))
  },
  extractContent (s) {
	  var span = document.createElement('span')
	  span.innerHTML = s
	  return (span.textContent || span.innerText).substring(0, 100)
  },
  getHoursDiff (t) {
    const hours = Math.floor(Math.abs(new Date() - new Date(t)) / 36e5)
    const days = Math.floor(hours / 24)
    const months = Math.floor(days / 24)
    if (hours < 24) { return hours + ' hours' }
    if (days < 30) { return days + ' days' }
    if (months > 1) { return months + ' months' }
  },
  getYmd (dt) {
    let d = dt.getDate(), m = dt.getMonth() + 1, y = dt.getFullYear()
    const od = d < 10 ? '0' + d : d, om = m < 10 ? '0' + m : m
    return y + '-' + om + '-' + od
  },
  getdmy (dt) {
    let d = dt.getDate(), m = dt.getMonth() + 1, y = dt.getFullYear()
    const od = d < 10 ? '0' + d : d, om = m < 10 ? '0' + m : m
    return om + '/' + od + '/' + y.toString().substr(-2)
  },
  getDmy (dt) {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]
    return monthNames[dt.getMonth()] + ' ' + dt.getDate() + ', ' + dt.getFullYear()
  }
}
