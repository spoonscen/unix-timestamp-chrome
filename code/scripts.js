setInterval( function(){
  var unixCurrentTime = moment().unix();
    $("input[name='number']").attr("placeholder", "Unix Timestamp eg: " + unixCurrentTime).html(++unixCurrentTime);
}, 1000);

var tz = jstz.determine();
    console.log(tz.name());

$(".yourTz").html("<strong>" + tz.name() + ": " + "</strong>");

$("#cleanDateForm").on("reset", function(e){
  if($(".cleanDate").html() !== 'Date will display here'){
    $(".yourTz").html("<strong>" + tz.name() + ": " + "</strong>");
    $(".cleanDate").hide().fadeIn().html('Date will display here');
    $(".cleanDateUtc").hide().fadeIn().html('Date will display here');
    $(".unixDate").hide().fadeIn().html('Timestamp will display here');
    $("#cleanDateForm")[0].reset();
    $("#MMDDYYYY").attr("class", "form-group");
    $("#unixTimeInput").attr("class", "form-group");
}});

$("#cleanDateForm").on("submit", function(e){
	e.preventDefault();


  var userNumber = $("input[name='number']").val();
  var humanDate = $("input[name='year']").val() + "/" + $("input[name='month']").val() + "/" +  $("input[name='day']").val() + " " +
                  $("input[name='hours']").val() + ":" + $("input[name='minutes']").val() + ":" + $("input[name='seconds']").val();

  if(userNumber === "" && humanDate === "// ::" ){
    userNumber = moment().unix();
  } else {
    userNumber = $("input[name='number']").val();
}

if(userNumber !==  ""){
  $(".cleanDate").html(cleanDate(userNumber));
  $(".cleanDateUtc").html(cleanDateUtc(userNumber));
  $(".unixDate").html(userNumber);
  $(".unixDateUtc").html(unixTimeUTC(humanDate));
}

if(userNumber === ""){
  $(".cleanDate").html(cleanDate(unixTime(humanDate)));
  $(".cleanDateUtc").html(cleanDateUtc(unixTime(humanDate)));
  $(".unixDate").html(unixTime(humanDate));
  $(".unixDateUtc").html(unixTimeUTC(humanDate));
}

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
  var time = month + '. ' + date + ', ' + year + ' ' + hour + ':' + min + ':' + sec;
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
  var time = month + '. ' + date + ', ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}

function unixTime(humanDate){
  var date = new Date(humanDate).getTime()/1000;
  return date;
}

function unixTimeUTC(humanDate){
  var date = new Date(humanDate).getTime()/1000 - 18000;
  return date;

}