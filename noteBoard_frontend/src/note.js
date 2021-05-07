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

            Note.appendNewNote(newNote)
        })
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




    
