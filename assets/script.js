$(function () {
  // HTML variables
  var currentDay = $('#currentDay')
  var timeslotContainer = $('.timeslot-container')

  // Global variables
  var today = dayjs()
  var savedNotes = JSON.parse(localStorage.getItem('saved-notes')) || {};
  var timeslotNumber = 9
  var timeStart = 9
  var timeState;

  // Initializing function
  function init(){
    currentDay.text(today.format('MMMM D, YYYY'))
    createTimeslots()
  }
  init()

  // Saves content from the applicable text area in the savedNotes variable and local storage
  function saveNotes(e){
    e.preventDefault()
    if(e.target.nodeName === 'BUTTON'){
      savedNotes[e.target.previousElementSibling.id] = e.target.previousElementSibling.value
    }else if(e.target.nodeName === 'I'){
      savedNotes[e.target.parentElement.previousElementSibling.id] = e.target.parentElement.previousElementSibling.value
    }
    console.log(savedNotes)
    localStorage.setItem('saved-notes', JSON.stringify(savedNotes))
    alert('Note saved')
  }

  // Creates timeslots and appends them to the HTML doc
  function createTimeslots(){
    for(i=0;i<timeslotNumber;i++){
      if(timeStart==today.hour()){
        timeState = 'present'
      }else if(timeStart<today.hour()){
        timeState = 'past'
      }else if(timeStart>today.hour()){
        timeState = 'future'
      }
      
      var printTime = today.hour(timeStart).format('hA')
      
      let timeBlock = document.createElement('div')
      timeBlock.setAttribute('class',`row time-block ${timeState}`)
      let hourBlock = document.createElement('div')
      hourBlock.setAttribute('class', 'col-2 col-md-1 hour text-center py-3')
      hourBlock.innerHTML = printTime
      let noteBlock = document.createElement('textarea')
      noteBlock.setAttribute('id',printTime)
      noteBlock.setAttribute('class', 'col-8 col-md-10 description')
      noteBlock.setAttribute('rows', '3')
      noteBlock.setAttribute('contenteditable', 'true')
      if(savedNotes.hasOwnProperty(printTime)){
        noteBlock.textContent = savedNotes[printTime]
      }
      let saveBtn = document.createElement('button')
      saveBtn.setAttribute('class', 'btn saveBtn col-2 col-md-1')
      saveBtn.setAttribute('aria-label', 'save')
      saveBtn.addEventListener('click', saveNotes)
      let iTag = document.createElement('i')
      iTag.setAttribute('class', 'fas fa-save')
      iTag.setAttribute('aria-hidden', 'true')

      saveBtn.append(iTag)
      timeBlock.append(hourBlock, noteBlock, saveBtn)
      timeslotContainer.append(timeBlock)
      timeStart+=1
    }
  }
});