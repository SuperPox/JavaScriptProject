function appendNotes(notes, element)
{
    const ul = document.createElement('ul')
    element.append(ul)

    for (let note of notes) 
    {
        const noteLi = document.createElement("li")

        const noteDelete = document.createElement("button")
        noteDelete.innerText = "Delete"

        noteLi.innerText = note.content
        noteDelete.addEventListener('click', (e) => deleteNote(note.id, noteLi))
        noteLi.append(noteDelete)
        ul.append(noteLi)
    }
}

function deleteNote(noteID, noteLi)
{
    //console.log(noteID)
    fetch(`http://localhost:3000/notes/${noteID}`, {method: "DELETE"})
    .then(jsonToJS)
    .then(response => {noteLi.remove()})

}

function appendNoteForm()
{
    const notes = document.getElementById('noteGrid')
    const noteForm = `
        <form id="noteForm">
            <label>Note Content: </label>
            <input id="noteContent"/>
            <input type="submit" value="Add Note"/>
        </form>
    `
    notes.innerHTML += noteForm
}

function displayNoteGrid(boardNotes)
{
    const noteGrid = document.getElementById('noteGrid')

    for (let note of boardNotes) {
        const noteLi = document.createElement('li')
        noteLi.innerText = note.content
        
        const noteDelete = document.createElement("button")
        noteDelete.innerText = "Delete"
        noteDelete.addEventListener("click", (e) => deleteNote(note.id, noteLi))
        noteLi.append(noteDelete)
        
        noteGrid.append(noteLi)
    }
}

function deleteNote(noteID, noteLi)
{
    fetch(`http://localhost:3000/notes/${noteID}`, {
        method: "DELETE"
    }).then(jsonToJS)
    .then (message => {
        noteLi.remove()
    }) 
}


function destroyNoteGridChildren()
{
    const noteGrid = document.getElementById('noteGrid')
    while (noteGrid.hasChildNodes()){
        noteGrid.removeChild(noteGrid.lastChild);
    }
}
    
