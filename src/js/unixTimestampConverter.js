import 'datejs'
import { determine } from 'jstz'
import moment from 'moment'

const DATE_FORMAT = 'MMM. DD, YYYY HH:mm:ss'

export const timezoneName = determine().name()

export const getDate = (timestamp) => new Date(timestamp * 1000)

export function cleanDate(timestamp) {
  return moment(getDate(timestamp)).format(DATE_FORMAT)
}

export function cleanDateUtc(timestamp) {
  return moment.utc(getDate(timestamp)).format(DATE_FORMAT)
}

export function getUnixTimestamp(humanDate) {
  const date = Date.parse(humanDate).getTime() / 1000
  return Math.round(date)
}
