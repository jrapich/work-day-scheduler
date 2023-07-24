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
  return storageArray;
}

function saveToStorageTiny(event) {
  event.preventDefault();
  let saveToStorage;
  let textAreaID;
  saveToStorage = $(event.target).parent().parent().children(".description");
  textAreaID = saveToStorage.attr("id");
  textAreaID = parseInt(textAreaID, 10);
  storageArray[textAreaID] = saveToStorage.val();
  localStorage.setItem("dayPlanner", JSON.stringify(storageArray));
  return storageArray;
}

//event listener for above function, which listens on every button on the page
$(".time-block").children(".btn").on("click", saveToStorage)
$(".fas").on("click", saveToStorageTiny);

properColors();
storageCheck();
appendEvents();
setInterval(Time, 1000);