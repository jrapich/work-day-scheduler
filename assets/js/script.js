 // Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
//$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.

let today = dayjs();
let currentHour;
let eventHoursArray = [
  "placeholder",
  "placeholder",
  "placeholder",
  "placeholder",
  "placeholder",
  "placeholder",
  "placeholder",
  "placeholder",
  "9am",
  "10am",
  "11am",
  "12pm",
  "1pm",
  "2pm",
  "3pm",
  "4pm",
  "5pm",
  "6pm"];

//display the current time/date and update it every second, and call it on page load
//compare the current time every second. if the hour has passed, change the hour to grey
//if it is the current hour, change it to red
//if it is a future hour, change it to green
function Time (){
  today = dayjs();
  $("#currentDay").text(today.format("dddd, MMMM D, YYYY h:mm:ss A"));
  currentHour = today.format("H");

  for (let i=8; i < (currentHour - 1); i++) {
    eventHoursArray[i] = "past";
  }

  for (let j=17; j > (currentHour - 1); j--) {
    eventHoursArray[j] = "future";
  }

  eventHoursArray[(currentHour-1)] = "present";
  }
setInterval(Time, 1000);

console.log(eventHoursArray);