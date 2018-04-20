import 'datejs'
import { determine } from 'jstz'
import moment from 'moment'

const DATE_FORMAT = 'MMM. DD, YYYY HH:mm:ss'

export const timezoneName = determine().name()

export const getDate = (timestamp) => new Date(timestamp * 1000)

export function cleanDate(timestamp) {
  if(!timestamp) {
    throw new Error('You must provide a timestamp')
  }
  return moment(getDate(timestamp)).format(DATE_FORMAT)
}

export function cleanDateUtc(timestamp) {
  if(!timestamp) {
    throw new Error('You must provide a timestamp')
  }
  return moment.utc(getDate(timestamp)).format(DATE_FORMAT)
}

export function getUnixTimestamp(humanDate) {
  if(!humanDate) {
    throw new Error('You must provide human date input')
  }
  const parsedDate = Date.parse(humanDate)
  if(!parsedDate) {
    throw new Error('Cannot parse date')
  }
  return parsedDate.getTime() / 1000
}
