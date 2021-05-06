const noteForm = document.getElementById('noteForm')

class Note {
    
    static allNotes = []

    constructor(note) {
        this.id = note.id
        this.content = note.content
        this.checkbox = note.checkbox
        this.boardId = note.boardId
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
        const notesBoardID = secretBoardID.innerText

        const secretBoardObject = document.getElementById("secretBoardObject")
        const notesBoardObject = JSON.parse(secretBoardObject.innerText)
        
        const userInput = e.target.children[1].value

        const body = {
            note: {
                content: userInput,
                board_id: notesBoardID
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
            //newNote.displayNoteGrid(this)
            //newNote.displayNoteGrid(this) //got here
            Note.showNewNote(newNote)
            //Note.displayNoteGrid(notesBoardObject)
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
            this.deleteNote(noteLi, noteId)  // NOT A FUNCTION unless I make Delete a static
        })

        noteLi.append(noteDelete)
        noteGrid.append(noteLi) 
    }
}
    ///////// APPENDING
    /*
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


    
