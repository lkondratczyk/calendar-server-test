(function(){
    'use strict';

    angular.module('calendar')
        .controller('dataCtrl',dataCtrl);



	function dataCtrl (){
        var vm = this;

        vm.gui = null;
        vm.working = false;
 vm.endDay = 17;
        vm.year = new Date().getFullYear();
        var year = new Date().getFullYear();
        var fallStartDate;
        var springStartDate;
        var winterStartDate;
        var winterEndDate;
        var summerStartDate;
        var summerEndDate;

        vm.yearList = [];
        for(var i = 4; i > 0; i--){
			vm.yearList.push(year - i);
        }
        for(i = 0; i < 10; i++){
			vm.yearList.push(year + i);
        }
        console.log('Years List: '+vm.yearList);
		vm.dayTypes = {
			ACAD: 'Academic Work Day',
			INST: 'Instructional Day',
			CONV: 'Convocation',
			COMM: 'Commencement',
			FINL: 'Finals',
			HOLI: 'Holiday',
//			WKND: 'Weekend',
			START: 'Semester Start',
//			FILL: 'Fill',
			OPEN: 'No classes, campus open',
			SUMM: 'Summer Sessions',
			WINT: 'Winter Session'
//			UNK: 'Unknown'
		};

		vm.hardRules = [
//			"Fall semester is at least 15 weeks long",
//			"Spring semester is at least 15 weeks long",
			"Instructional Days is 147 \xB1 2 days",
			"Academic Work Days is 147 \xB1 2 days",
			"Fall and Spring semesters do not start on a Friday",
			"Fall and Spring finals are 5 weekdays and one Saturday (either before, in the middle, or after)",
			"Fall semester must start between Aug 17 and Sep 1",
			"Spring semester must start on or after Jan 15 (or Jan 16, if it is a leap year)",
			"Spring semester must end on or before May 31",
			"2-5 days between Convocation and the beginning of Fall semester",
			"10-15 Winter session Instructional Days",
			"Summer session is at least 12 calendar weeks",
			"4 days between the end of Spring finals and before Summer start date are reserved for Commencement",
			"Spring Break is a calendar week",
			"Fall Break is the Wednesday before Thanksgiving, Thursday, and Friday",
			"Holidays are always considered to be of day type Holiday",
			"Holidays that fall on weekends are observed on the nearest workdays",
			"Academic Work Days include Instructional, Final and Commencement days but exclude 'Campus Open-No Classes' days (Fall/Spring breaks)",
			"Convocation is held on an Academic Work Day between the first day of Fall and the first day of Fall classes."

		];

		vm.selections = {
			rules: []
		};

		vm.softRules = {
			weekdayIdNum: 'Even distribution of one day per week classes (14-15)',
			convocationFriBeforeFirstID: 'Convocation is a Friday before the first Instructional Day (ID) of Fall semester',
			fallStartMon: 'Fall semester starts on a Monday',
			extendedFallBreak: 'Extended Fall break (take off Monday-Wednesday before Thanksgiving)',
			fallFinalsMonday: 'Fall semester finals start on a Monday',
			summerToFallMoreThanWeek: 'Difference between the end of Summer and start of Fall semester is more than 7 calendar days',
			CesarChavezInSpringBreak: 'Put Cesar Chavez Day in Spring Break (after if not selected)',
			springFinalsMonday: 'Spring semester finals start on a Monday',
			commencementTueFri: 'Commencement is Tuesday - Friday',
			commencementBeforeMemorial: 'Commencement is before Memorial Day',
			limitWinterTenDays: "Limit winter session to 10 days long",
			springAfterMLK: "Spring start after MLK"
		};

        vm.getCalendar = function(){
			console.log('SEND INFORMATION FOR BACKEND : '+vm.year);
			console.log(vm.selections.rules);
            //setting the initials for the constructCalendarData
            var startDate = {};
			startDate.month = "AUG";
			startDate.dayNumber = vm.endDay;
			var Calendar = require('./initData').Calendar;
			var calendar = new Calendar();
			
            vm.gui = calendar.constructCalendarData(parseInt(vm.year), startDate, vm.selections.rules, false);

            console.log(vm.gui[0]);

			if(vm.gui[0].length == 0){
				console.log("no calendars due to the following conflicts:");
				console.log(vm.gui[1]);
			}


        };

        // for the special styling of the first days of the semesters
        vm.dayStyle = function(option,type,month,day,year){
        	// THIS IS VERY INEFFICIENT. FIGURE OUT A WAY TO REDO.
				fallStartDate = option.candidateEntryData[option.candidateEntryData.boundaries['FALL_START']];
				springStartDate = option.candidateEntryData[option.candidateEntryData.boundaries['SPRING_START']];
				winterStartDate = option.candidateEntryData[option.candidateEntryData.boundaries['WINTER_START']];
				winterEndDate = option.candidateEntryData[option.candidateEntryData.boundaries['WINTER_END']];
				summerStartDate = option.candidateEntryData[option.candidateEntryData.boundaries['SUMMER_START']];
				summerEndDate = option.candidateEntryData[option.candidateEntryData.boundaries['SUMMER_END']];
        	if(day == fallStartDate.dayNumber && month == fallStartDate.month && year == fallStartDate.year)
        		return "START"
        	else if(day == springStartDate.dayNumber && month == springStartDate.month && year == springStartDate.year)
				return "START"
        	else if(month == winterStartDate.month && year == winterStartDate.year)
        		if(day >= winterStartDate.dayNumber && day <= winterEndDate.dayNumber && type == 'INST')
					return "WINT"
				else
					return type
			else if(type== 'INST' && ((month == summerStartDate.month && day >= summerStartDate.dayNumber) || month == 'JUN' || month == 'JUL' || (month == summerEndDate.month && day <= summerEndDate.dayNumber)))
	        	return "SUMM"
			else
        		return type
        };

//        var fallStart = vm.gui.candidateEntryData.previousYearEnd;
//        fallStart.month;
//        fallStart.dayNumber;
//        var springStart = vm.gui.candidateEntryData[vm.gui.candidateEntryData.boundaries["SPRING_START"]];
//        springStart.month;
//        springStart.dayNumber;


  }
}());