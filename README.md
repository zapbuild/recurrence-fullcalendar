### To generate event recurrence as per (days, weeks, months, years) for calendar event

#### Example
```
var r = require("recurrence-fullcalendar");
var event = {
    title: "Test event",
    start: "2016-04-26 16:00:00",
    end: "2018-05-26 16:00:00",
    allDay: false
};

r.generateOccurrences(event, "years").then(function(res){
  console.log(res);
}).catch(function(err){
  console.log(err);
});
```
