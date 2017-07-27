require('datejs')
const { determine } = require('jstz')
const moment = require('moment')

const timezoneName = determine().name()
const [cleanDateElement] = document.getElementsByClassName("cleanDate")
const [convertedDateUtcElement] = document.getElementsByClassName("convertedDateUtc")
const [convertedDateUnixElement] = document.getElementsByClassName("convertedDateUnix")
const unixTimestampInput = document.getElementById('unixTimestampInput')
const humanDateInput = document.getElementById('fulldate')
const oneSecond = 1000
const setPlaceholderText = () => unixTimestampInput.placeholder = `Unix Timestamp eg: ${moment().unix()}`

setPlaceholderText()
setInterval(setPlaceholderText, oneSecond)

const submit = (e) => {
  e.preventDefault()
  const humanDateValue = humanDateInput.value
  const bothInputsEmpty = unixTimestampInput.value === '' && humanDateValue === ''
  const unixTimestampInputValue = bothInputsEmpty ? moment().unix() : unixTimestampInput.value

  cleanDateElement.innerHTML = cleanDate(unixTimestampInputValue)
  convertedDateUtcElement.innerHTML = convertedDateUtc(unixTimestampInputValue)
  convertedDateUnixElement.innerHTML = unixTimestampInputValue

  if (humanDateValue) {
    cleanDateElement.innerHTML = cleanDate(getUnixTimestamp(humanDateValue))
    convertedDateUtcElement.innerHTML = convertedDateUtc(getUnixTimestamp(humanDateValue))
    convertedDateUnixElement.innerHTML = getUnixTimestamp(humanDateValue)
  }
}

const reset = () => {
  const defaultText = 'Date will display here'
  if (cleanDateElement.innerHTML === defaultText) return
  cleanDateElement.innerHTML = defaultText
  convertedDateUtcElement.innerHTML = defaultText
  convertedDateUnixElement.innerHTML = 'Timestamp will display here'
}

function cleanDate(timestamp) {
  return moment(new Date(timestamp * 1000)).format('MMMM Do YYYY, HH:mm:ss a')
}

function convertedDateUtc(timestamp) {
  return moment.utc(new Date(timestamp * 1000)).format('MMMM Do YYYY, HH:mm:ss a')
}

function getUnixTimestamp(humanDate) {
  const date = new Date(Date.parse(humanDate)).getTime() / 1000
  return Math.round(date)
}

module.exports = {
  getUnixTimestamp: getUnixTimestamp,
  convertedDateUtc: convertedDateUtc,
  cleanDate: cleanDate
}

document.getElementById('submit').onclick = submit
document.getElementById('reset').onclick = reset
document.getElementById("yourTz").innerHTML = `${timezoneName}: `