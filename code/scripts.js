$("#cleanDateForm").on("submit", function(e){
	e.preventDefault();
    
    var userNumber = $("input[type='number']").val();

    $(".cleanDate").html('<strong>Your Timezone: </strong>' + cleanDate(userNumber));
    $(".cleanDateUtc").html('<strong>UTC: </strong>' + cleanDateUtc(userNumber));
});

function cleanDate(UNIX_timestamp){
  var a = new Date(UNIX_timestamp*1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours() < 10 ? '0' + a.getHours() : a.getHours();
  var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
  var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
  var time = date + ', ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}

function cleanDateUtc(UNIX_timestamp){
  var a = new Date(UNIX_timestamp*1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getUTCFullYear();
  var month = months[a.getUTCMonth()];
  var date = a.getUTCDate();
  var hour = a.getUTCHours() < 10 ? '0' + a.getUTCHours() : a.getUTCHours();
  var min = a.getUTCMinutes() < 10 ? '0' + a.getUTCMinutes() : a.getUTCMinutes();
  var sec = a.getUTCSeconds() < 10 ? '0' + a.getUTCSeconds() : a.getUTCSeconds();
  var time = date + ', ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}