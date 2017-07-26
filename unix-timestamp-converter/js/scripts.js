require('datejs')
const jstz = require('jstz')
const $ = require('jQuery')
const moment = require('moment')
// function that takes the current timestamp and increments it by 1 second to keep the current time
setInterval(function () {
  var unixCurrentTime = moment().unix();
  $("input[name='number']").attr("placeholder", "Unix Timestamp eg: " + unixCurrentTime).html(++unixCurrentTime);
}, 1000);

//Get the current timezone from jstimezonedetect
var tz = jstz.determine();


//Display your actual timezone
$(".yourTz").html("<strong>" + tz.name() + ": " + "</strong>");

//reset the form to the placeholders
$("#convertDateForm").on("reset", function (e) {
  if ($(".cleanDate").html() !== 'Date will display here') {
    $(".yourTz").html("<strong>" + tz.name() + ": " + "</strong>");
    $(".cleanDate").hide().fadeIn().html('Date will display here');
    $(".convertedDateUtc").hide().fadeIn().html('Date will display here');
    $(".convertedDateUnix").hide().fadeIn().html('Timestamp will display here');
    $("#convertDateForm")[0].reset();
    $("#MMDDYYYY").attr("class", "form-group");
    $("#unixTimeInput").attr("class", "form-group");
  }
});


//function to change
$("#convertDateForm").on("submit", function (e) {
  e.preventDefault();

  var unixTimestampInput = $("input[name='number']").val();
  var humanDate = $("input[name='fulldate']").val();
  var d1 = Date.parse(humanDate);

  if (unixTimestampInput === "" && d1 === null) {
    unixTimestampInput = moment().unix();
  } else {
    unixTimestampInput = $("input[name='number']").val();
  }

  //if the unix timestamp input is not equal to an empty string run these functions that convert the input
  if (unixTimestampInput !== "") {
    $(".cleanDate").html(cleanDate(unixTimestampInput));
    $(".convertedDateUtc").html(convertedDateUtc(unixTimestampInput));
    $(".convertedDateUnix").html(unixTimestampInput);
  }

  // if the unix timestamp input is equal to an empty string run the function to convert the human readable date into the unix timestamp
  if (unixTimestampInput === "") {
    $(".cleanDate").html(cleanDate(unixTime(d1)));
    $(".convertedDateUtc").html(convertedDateUtc(unixTime(d1)));
    $(".convertedDateUnix").html(unixTime(d1));
  }

});

//takes in a unix timestamp and creates a human readable date in your timezone
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
function unixTime(d1) {
  var date = new Date(d1).getTime() / 1000;
  return Math.round(date);
}


module.exports = {
  unixTime: unixTime,
  convertedDateUtc: convertedDateUtc,
  cleanDate: cleanDate
}