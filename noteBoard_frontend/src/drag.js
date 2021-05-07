window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
});


var draggables = document.querySelectorAll('.draggable')
var containers = document.querySelectorAll('.container')
var trashGate = true;


draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging')
  })

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging')
  })
})

containers.forEach(container => {
  container.addEventListener('dragover', e => {
    e.preventDefault()
    const afterElement = getDragAfterElement(container, e.clientY)
    const draggable = document.querySelector('.dragging')

    if (afterElement == null) {
      container.appendChild(draggable)
      //checkTrash()
      setTimeout(checkTrashDelay, 1000)
    } else {
      container.insertBefore(draggable, afterElement)
      setTimeout(checkTrashDelay, 1000)
    }
  })
})

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]
  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}

function checkTrash() {
    const trashContainer = document.getElementById('trashDiv')  
    if (trashGate == true) 
    {
        if (trashContainer.hasChildNodes())
        {
            if(trashContainer.firstChild.className == "draggable") {
                console.log("flipped trash gate" + trashGate)
                trashGate = false;
                let childToCheck = trashContainer.lastElementChild
                let referenceDetails = ""
        
                if (childToCheck.lastElementChild.className == "invisible"){
                    referenceDetails = childToCheck.lastElementChild.innerHTML            
        
                    let refString = referenceDetails.toString()
                    let refArr = refString.split(' ');
                    let refId = parseInt(refArr[1])
        
                    if (refArr[0] == "board") {
                        deleteBoardObject(refId)
                        console.log("deleted a board")
                    }
                    if (refArr[0] == "note") {
                        //let refBoardId = parseInt(refArr[2])
                        deleteNoteObject(refId)
                        console.log("deleted a note")
                    }        
                }       
            }               
        }
    }
}

function emptyTrash() {
    const trashContainer = document.getElementById('trashDiv')   
    while (trashContainer.firstChild) {
       trashContainer.removeChild(trashContainer.firstChild)
    }
    refreshDraggables()
    trashGate = true; 
}

function checkTrashDelay() {
    checkTrash();
}

function refreshDraggables() {
    //console.log("tick")
    draggables = document.querySelectorAll('.draggable')
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
          draggable.classList.add('dragging')
        })
      
        draggable.addEventListener('dragend', () => {
          draggable.classList.remove('dragging')
        })
      })
}



//refreshDraggables();