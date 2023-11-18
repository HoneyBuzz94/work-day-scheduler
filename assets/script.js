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
      
      let parentDiv = document.createElement('div')
      parentDiv.setAttribute('id',printTime)
      parentDiv.setAttribute('class',`row time-block ${timeState}`)
      let childDiv = document.createElement('div')
      childDiv.setAttribute('class', 'col-2 col-md-1 hour text-center py-3')
      childDiv.innerHTML = printTime
      let textArea = document.createElement('textarea')
      textArea.setAttribute('class', 'col-8 col-md-10 description')
      textArea.setAttribute('rows', '3')
      textArea.setAttribute('contenteditable', 'true')
      let saveBtn = document.createElement('button')
      saveBtn.setAttribute('class', 'btn saveBtn col-2 col-md-1')
      saveBtn.setAttribute('aria-label', 'save')
      saveBtn.addEventListener('click', function(e){
        e.preventDefault()
        let textEl; 
        if(e.target.nodeName === 'BUTTON'){
          console.log('Success!')
          textEl = e.target.previousElementSibling
        }else if(e.target.nodeName === 'I'){
          textEl = e.target.parentElement.previousElementSibling
        }
        console.log(textEl)
      })
      let iTag = document.createElement('i')
      iTag.setAttribute('class', 'fas fa-save')
      iTag.setAttribute('aria-hidden', 'true')

      saveBtn.append(iTag)
      parentDiv.append(childDiv, textArea, saveBtn)
      timeslotContainer.append(parentDiv)
      timeStart+=1
    }
  }






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
