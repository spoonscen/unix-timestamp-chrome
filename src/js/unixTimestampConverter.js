require('datejs')
const { determine } = require('jstz')
const moment = require('moment')

const timezoneName = determine().name()

const getDate = (timestamp) => new Date(timestamp * 1000)
const dateFormat = 'MMMM Do YYYY, HH:mm:ss a'

function cleanDate(timestamp) {
  return moment(getDate(timestamp)).format(dateFormat)
}

function cleanDateUtc(timestamp) {
  return moment.utc(getDate(timestamp)).format(dateFormat)
}

function getUnixTimestamp(humanDate) {
  const date = Date.parse(humanDate).getTime() / 1000
  return Math.round(date)
}

module.exports = {
  getUnixTimestamp,
  cleanDateUtc,
  cleanDate,
  timezoneName
}
