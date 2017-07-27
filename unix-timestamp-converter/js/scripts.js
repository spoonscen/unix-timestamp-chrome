require('datejs')
const { determine } = require('jstz')
const $ = require('jQuery')
const moment = require('moment')

const timezoneName = determine().name();
const [cleanDateElement] = document.getElementsByClassName("cleanDate")
const [convertedDateUtcElement] = document.getElementsByClassName("convertedDateUtc")
const [convertedDateUnixElement] = document.getElementsByClassName("convertedDateUnix")

setInterval(function () {
  var unixCurrentTime = moment().unix();
  $("input[name='number']").attr("placeholder", "Unix Timestamp eg: " + unixCurrentTime).html(++unixCurrentTime);
}, 1000);

const submit = (e) => {
  e.preventDefault();
  var unixTimestampInput = $("input[name='number']").val();
  var humanDate = $("input[name='fulldate']").val();

  if (unixTimestampInput === "" && humanDate === '') {
    unixTimestampInput = moment().unix();
  } else {
    unixTimestampInput = $("input[name='number']").val();
  }
  //if the unix timestamp input is not equal to an empty string run these functions that convert the input
  if (unixTimestampInput !== "") {
    cleanDateElement.innerHTML = cleanDate(unixTimestampInput)
    convertedDateUtcElement.innerHTML = convertedDateUtc(unixTimestampInput)
    convertedDateUnixElement.innerHTML = unixTimestampInput;
  }
  // if the unix timestamp input is equal to an empty string run the function to convert the human readable date into the unix timestamp
  if (unixTimestampInput === "") {
    cleanDateElement.innerHTML = cleanDate(unixTime(humanDate))
    convertedDateUtcElement.innerHTML = convertedDateUtc(unixTime(humanDate))
    convertedDateUnixElement.innerHTML = unixTime(humanDate)
  }
}

const reset = () => {
  if (cleanDateElement.innerHTML !== 'Date will display here') {
    cleanDateElement.innerHTML = 'Date will display here'
    convertedDateUtcElement.innerHTML = 'Date will display here'
    convertedDateUnixElement.innerHTML = 'Timestamp will display here'
  }
}


function cleanDate(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours() < 10 ? '0' + a.getHours() : a.getHours();
  var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
  var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
  var time = month + '. ' + date + ', ' + year + ' ' + hour + ':' + min + ':' + sec;
  return time;
}


//takes a unix timestamp in and creates a human readable date in UTC
function convertedDateUtc(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var year = a.getUTCFullYear();
  var month = months[a.getUTCMonth()];
  var date = a.getUTCDate();
  var hour = a.getUTCHours() < 10 ? '0' + a.getUTCHours() : a.getUTCHours();
  var min = a.getUTCMinutes() < 10 ? '0' + a.getUTCMinutes() : a.getUTCMinutes();
  var sec = a.getUTCSeconds() < 10 ? '0' + a.getUTCSeconds() : a.getUTCSeconds();
  var time = month + '. ' + date + ', ' + year + ' ' + hour + ':' + min + ':' + sec;
  return time;
}


//takes the human date in and outputs the unix timestamp
function unixTime(humanDate) {
  var date = new Date(Date.parse(humanDate)).getTime() / 1000;
  return Math.round(date);
}


module.exports = {
  unixTime: unixTime,
  convertedDateUtc: convertedDateUtc,
  cleanDate: cleanDate
}

document.getElementById('submit').onclick = submit
document.getElementById('reset').onclick = reset
document.getElementById("yourTz").innerHTML = `${timezoneName}: `