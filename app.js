var express = require('express');
var app = express();
var calendar = require('./initData');
app.get('/', function (req, res) {
	//var Calendars;
	//require("/initData", function(calendar){
  
  
            //  var startDate = {};
			//startDate.month = "AUG";
			//startDate.dayNumber = 20;
			
			//console.log(parseInt(vm.year));
			//console.log(startDate);
			//console.log(vm.selections.rules);
  
  
	var academicYear = 2016;
	var startDate = {};
	startDate.month = "AUG";
	startDate.dayNumber = 20;
	var conditions = ["convocationFriBeforeFirstID", "fallStartMon", "commencementBeforeMemorial", "commencementTueFri"];
	Calendars = calendar.test(academicYear, startDate, conditions, false);
	//});
	res.send(Calendars);
  
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});