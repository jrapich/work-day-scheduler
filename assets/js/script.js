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
  "5pm"];
let storageArray = [
  "placeholder",
  "placeholder",
  "placeholder",
  "placeholder",
  "placeholder",
  "placeholder",
  "placeholder",
  "placeholder",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  ""
];

//compare the current time to event rows on the page. if the hour has passed, change the hour to grey
//if it is the current hour, change it to red
//if it is a future hour, change it to green
function properColors () {
  currentHour = today.format("H");
  for (let i=8; i < (currentHour - 1); i++) {
    eventHoursArray[i] = "past";
  }

  for (let j=17; j > (currentHour - 1); j--) {
    eventHoursArray[j] = "future";
  }

  eventHoursArray[(currentHour-1)] = "present";
  
  for (let index = 8; index <= 16; index++) {
    $("#hour-"+(index+1)).addClass(eventHoursArray[index]);
    console.log("hour "+ (index+1) +" is set to the " + eventHoursArray[index]);
  }

}
//display the current time/date and update it every second, and call it on page load
function Time (){
  today = dayjs();
  $("#currentDay").text(today.format("dddd, MMMM D, YYYY h:mm:ss A"));
  currentHour = today.format("H");  
}

//on page load, check if we have events stored. if so, load them.
function storageCheck() {
  if (!localStorage.getItem("dayPlanner")) {
    localStorage.setItem("dayPlanner", JSON.stringify(storageArray)); 
  } else {
    storageArray = JSON.parse(localStorage.getItem("dayPlanner"));
    return storageArray;
  }
}

//append stored events to the page
function appendEvents() {
  for (p=8; p < storageArray.length; p++) {
    $("#hour-"+ (p+1)).children(".description").text(storageArray[p]);
  }
}

//function to save the typed event to storage
function saveToStorage(event) {
  event.preventDefault();
  let saveToStorage;
  let textAreaID;
  saveToStorage = $(event.target).parent().children(".description");
  textAreaID = saveToStorage.attr("id");
  textAreaID = parseInt(textAreaID, 10);
  storageArray[textAreaID] = saveToStorage.val();
  localStorage.setItem("dayPlanner", JSON.stringify(storageArray));
}

//event listener for above function
$(".time-block").children(".btn").on("click", saveToStorage)

properColors();
storageCheck();
appendEvents();
setInterval(Time, 1000);