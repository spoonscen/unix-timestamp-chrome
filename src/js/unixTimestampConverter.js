require('datejs')
const { determine } = require('jstz')
const moment = require('moment')

const timezoneName = determine().name()


// const submit = (e) => {
//   e.preventDefault()
//   const humanDateValue = humanDateInput.value
//   const bothInputsEmpty = unixTimestampInput.value === '' && humanDateValue === ''
//   const unixTimestampInputValue = bothInputsEmpty ? moment().unix() : unixTimestampInput.value
//
//   cleanDateElement.innerHTML = cleanDate(unixTimestampInputValue)
//   convertedDateUtcElement.innerHTML = cleanDateUtc(unixTimestampInputValue)
//   convertedDateUnixElement.innerHTML = unixTimestampInputValue
//
//   if (humanDateValue) {
//     cleanDateElement.innerHTML = cleanDate(getUnixTimestamp(humanDateValue))
//     convertedDateUtcElement.innerHTML = cleanDateUtc(getUnixTimestamp(humanDateValue))
//     convertedDateUnixElement.innerHTML = getUnixTimestamp(humanDateValue)
//   }
// }
//
// const reset = () => {
//   const defaultText = 'Date will display here'
//   if (cleanDateElement.innerHTML === defaultText) return
//   cleanDateElement.innerHTML = defaultText
//   convertedDateUtcElement.innerHTML = defaultText
//   convertedDateUnixElement.innerHTML = 'Timestamp will display here'
// }

const getDate = (timestamp) => new Date(timestamp * 1000)
const dateFormat = 'MMMM Do YYYY, HH:mm:ss a'

function cleanDate(timestamp) {
  return moment(getDate(timestamp)).format(dateFormat)
}

function cleanDateUtc(timestamp) {
  return moment.utc(getDate(timestamp)).format(dateFormat)
}

function getUnixTimestamp(humanDate) {
  const date = new Date(Date.parse(humanDate)).getTime() / 1000
  return Math.round(date)
}

module.exports = {
  getUnixTimestamp,
  cleanDateUtc,
  cleanDate,
  timezoneName
}
