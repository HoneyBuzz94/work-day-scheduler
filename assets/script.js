$(function () {
  // HTML variables
  var currentDay = $('#currentDay')
  var timeslotContainer = $('.timeslot-container')

  // Global variables
  var today = dayjs()
  var savedNotes = JSON.parse(localStorage.getItem("saved-notes")) || [];

  // Initializing function
  function init(){
    currentDay.text(today.format('MMMM D, YYYY'))
    createTimeslots()
  }
  init()

  // Creates timeslots and appends them to the HTML doc
  function createTimeslots(){
    var timeslotNumber = 9
    var timeStart = 9
    var timeState = ''

    for(i=0;i<timeslotNumber;i++){
      if(timeStart==today.hour()){
        timeState = 'present'
      }else if(timeStart<today.hour()){
        timeState = 'past'
      }else if(timeStart>today.hour()){
        timeState = 'future'
      }
      
      var printTime = today.hour(timeStart).format('hA')
      var timeslotDiv = '<div class="row time-block-'+printTime+' '+timeState+'"><div class="col-2 col-md-1 hour text-center py-3">'+printTime+'</div><textarea class="col-8 col-md-10 description" rows="3"> </textarea><button class="btn saveBtn col-2 col-md-1" aria-label="save"><i class="fas fa-save" aria-hidden="true"></i></button></div>'

      timeslotContainer.append(timeslotDiv)
      timeStart+=1
    }
  }

  function logNotes(){
    savedNotes.push($('.description').text());
    localStorage.setItem("saved-notes", JSON.stringify(savedNotes));
  }

  $('saveBtn').on('click', logNotes)
  
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
});
