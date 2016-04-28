/**
 * Class RecurrenceFullCalendar
 *
 * The Recurrence stores different implementations of the Recurrence Interface.
 * When requested it can create specific implementations if they have been stored or return
 * all of them.
 *
 * This class would usually be used in conjunction with Full Calendar implementations.
 *
 */

/**
 * Module dependencies.
 */

var moment = require('moment');
var Promise = require('bluebird');

var RecurrenceFullCalendar = function(){};

// Define prototype
var RFC = RecurrenceFullCalendar.prototype;

/**
 * Get the recurrence as per type.
 *
 * @param {object} event
 * {
 *    title: 'My next birthday',
 *		start: new Date(2012, 6, 18, 16),
 *		end: new Date(2012, 6, 18, 23, 30)
 * }
 *
 * @param {string} recurrenceType [days, weeks, months, years]
 *
 * @return Promise
 **/
RFC.generateOccurrences = function(event, recurrenceType) {

	return new Promise(function(resolve, reject) {

		if (Object.keys(event).length == 0) {
			return reject(new Error("Provided event is empty."));
		}

		if (event.start == undefined || event.end == undefined) {
			return reject(new Error("Start and End date is required in event data"));
		}

		if(!['days', 'weeks', 'months', 'years'].indexOf(recurrenceType)) {
			return reject(new Error("Not a valid recurrenceType."));
		}

		var startDate = moment(event.start, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD');
		var startTime = moment(event.start, 'YYYY-MM-DD HH:mm:ss').format('HH:mm:ss');
		var endDate = moment(event.end, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD');
		var endTime = moment(event.end, 'YYYY-MM-DD HH:mm:ss').format('HH:mm:ss');

		var events = [];

		for (
			var m = moment(startDate); // start from startDate
			m.isSameOrBefore(moment(endDate)); // till endDate
			m.add(1, recurrenceType) // Add days, weeks, months as per repeatFreq
		) {
			var d = m.format('YYYY-MM-DD');
			var v = JSON.parse(JSON.stringify(event)); //Clone object
			v.start = d + " " + startTime;
			v.end = d + " " + endTime;

			events.push(v);

			// To generate an exit condition mannually
			var temp = moment(m),
				temp = temp.add(1, recurrenceType);

			if (!temp.isSameOrBefore(moment(endDate))) { // Reached at end
				resolve(events); // Resolve this function after successfull insertion
			}

		}

	});

}

// Factory
module.exports = exports = new RecurrenceFullCalendar();
