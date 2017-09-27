import 'datejs'
import { determine } from 'jstz'
import moment from 'moment'

export const timezoneName = determine().name()

const getDate = (timestamp) => new Date(timestamp * 1000)
const dateFormat = 'MMM. DD, YYYY HH:mm:ss'

export function cleanDate(timestamp) {
  return moment(getDate(timestamp)).format(dateFormat)
}

export function cleanDateUtc(timestamp) {
  return moment.utc(getDate(timestamp)).format(dateFormat)
}

export function getUnixTimestamp(humanDate) {
  const date = Date.parse(humanDate).getTime() / 1000
  return Math.round(date)
}

module.exports = {
  getUnixTimestamp,
  cleanDateUtc,
  cleanDate,
  timezoneName
}
