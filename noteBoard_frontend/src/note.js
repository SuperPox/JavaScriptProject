const noteForm = document.getElementById('noteForm')

class Note {
    
    static allNotes = []

    constructor(note) {
        this.id = note.id
        this.content = note.content
        this.checkbox = note.checkbox
        this.boardId = note.boardId
        //this.board_id = note.board_id
        //this.boardId = note.board_id
        Note.allNotes.push(this)
    }

    static displayNoteGrid(boardNotes) {
        const noteGrid = document.getElementById('noteGrid')
        
        for (let note of boardNotes) {
            const noteLi = document.createElement('li')
            const noteId = note.id
            noteLi.innerText = note.content
            
            const noteDelete = document.createElement("button")
            noteDelete.innerText = "✖"
            noteDelete.addEventListener("click", e => {
                this.deleteNote(noteLi, noteId)  // NOT A FUNCTION unless I make Delete a static
            })

            noteLi.append(noteDelete)
            noteGrid.append(noteLi)
        }
    }

    static appendToNoteContainer(notes) {
        const sortNoteContainer = document.getElementById("sortableNoteContainer")
        
        for (let note of notes) {
            const newSortableNote = document.createElement('p')
            newSortableNote.className = "draggable"
            newSortableNote.draggable = "true"
            newSortableNote.innerHTML = note.content 

            const referenceDiv = document.createElement('div')
            const referenceType = "note"
            const referenceId = note.id
            const referenceBoardId = note.boardId

            referenceDiv.innerHTML = `${referenceType} ${referenceId} ${referenceBoardId}`
            referenceDiv.className = "invisible"
          
            sortNoteContainer.appendChild(newSortableNote)
            newSortableNote.appendChild(referenceDiv)

            refreshDraggables()
        }
    }

    static deleteNote(noteLi, noteId) {
        fetch(`http://localhost:3000/notes/${noteId}`, {
            method: "DELETE"
        })
        .then(jsonToJS)
        .then (m => {
            noteLi.remove()
            Note.allNotes = Note.allNotes.filter(note => note.id !== noteId)
        })
    }

    static postNote(e) {
        e.preventDefault()
        const secretBoardID = document.getElementById("secretBoardID")
        const notesBoardIDString = secretBoardID.innerText
        const notesBoardIDint = parseInt(notesBoardIDString)

        const secretBoardObject = document.getElementById("secretBoardObject")
        const notesBoardObject = JSON.parse(secretBoardObject.innerText)

        const userInput = e.target.children[1].value

        const body = {
            note: {
                content: userInput,
                board_id: notesBoardIDint
            }
        }
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(body)
        }
        e.target.reset()
        fetch("http://localhost:3000/notes", options)
        .then(jsonToJS)
        .then(note => {
            let newNote = new Note(note)
            let boardIdToAdd = note.board_id;
            newNote.boardId = boardIdToAdd;

            Note.showNewNote(newNote)
            Note.appendNewNote(newNote)
        })
    }

    static showNewNote(newNote) {
        const noteGrid = document.getElementById('noteGrid')
        const noteLi = document.createElement('li')
        const noteId = newNote.id

        noteLi.innerText = newNote.content
        
        const noteDelete = document.createElement("button")
        noteDelete.innerText = "✖"
        noteDelete.addEventListener("click", e => {
            this.deleteNote(noteLi, noteId)  
        })

        noteLi.append(noteDelete)
        noteGrid.append(noteLi) 
    }

    static appendNewNote(newNote) {
        const sortNoteContainer = document.getElementById("sortableNoteContainer")
        
        const newSortableNote = document.createElement('p')
        newSortableNote.className = "draggable"
        newSortableNote.draggable = "true"
        newSortableNote.innerHTML = newNote.content 

        const referenceDiv = document.createElement('div')
        const referenceType = "note"
        const referenceId = newNote.id
        const referenceBoardId = newNote.boardId

        referenceDiv.innerHTML = `${referenceType} ${referenceId} ${referenceBoardId}`
        referenceDiv.className = "invisible"
      
        sortNoteContainer.appendChild(newSortableNote)
        newSortableNote.appendChild(referenceDiv)

        refreshDraggables()
    }

}

function deleteNoteObject(refId) {
    fetch(`http://localhost:3000/notes/${refId}`, {
            method: "DELETE"
        })
        .then(jsonToJS)
        .then (m => {
            emptyTrash();
            Note.allNotes = Note.allNotes.filter(note => note.id !== refId)
    })
}




    ///////// APPENDING
    /*
    static deleteNote(noteLi, noteId) {
        fetch(`http://localhost:3000/notes/${noteId}`, {
            method: "DELETE"
        })
        .then(jsonToJS)
        .then (m => {
            noteLi.remove()
            Note.allNotes = Note.allNotes.filter(note => note.id !== noteId)
        })
    }



    static appendNotes(notes, element) {
        const ul = document.createElement('ul')
        ul.id = `list-${this.id}`
        element.append(ul)

        for (let note of notes) {
            note.appendNote()
        }
    }
    appendNote() {
        const noteLi = document.createElement("li")
        const div = document.createElement("div")

        const noteDelete = document.createElement("button")
        noteDelete.innerText = "Delete"

        noteLi.innerText = this.content
        noteDelete.addEventListener('click', (e) => {
            this.deleteNote(noteLi)
        })

        noteLi.append(div)
        div.append(noteLi)
        ul.append(div)
    }
    */
    //////////
/*
function deleteNote(noteID, noteLi)
{
    fetch(`http://localhost:3000/notes/${noteID}`, {
        method: "DELETE"
    }).then(jsonToJS)
    .then (message => {
        noteLi.remove()
    }) 
}


function deleteNote(noteLi) 
{
    fetch(`http://localhost:3000/notes/${this.id}`, {
        method: "DELETE"
    })
    .then(jsonToJS)
    .then (message => {
        noteLi.remove()
        Note.allNotes = Note.allNotes.filter(note => note.id !== this.id)
    }) 
}




function createNewNote(e) 
{
    console.log("create new note")
    e.preventDefault()
    const userInput = e.target.children[1].value
    const noteId = e.target.children[2].id
    
    const body = {
        note: {
            content: userInput,
            noteId: noteId
        }
    }
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(body)
    }
    e.target.reset()
    fetch("http://localhost:3000/notes", options)
    .then(jsonToJS)
    .then(note => {
        let li = document.getElementById(`note-${note.note_id}`)
        let newNote = new Note(note)
        newNote.appendNote(li)
    })

}


*/


    
