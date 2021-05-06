
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
            noteLi.innerText = note.content
            
            const noteDelete = document.createElement("button")
            noteDelete.innerText = "Delete"
            //noteDelete.addEventListener("click", (e) => {deleteNote(noteLi)})
            noteLi.append(noteDelete)
            noteGrid.append(noteLi)
        }
    }

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
        noteDelete.addEventListener('click', (e) => deleteNote(noteLi))
        //noteDelete.addEventListener('click', this.deleteNote.bind(this))

        noteLi.append(div)
        div.append(noteLi)
        ul.append(div)
    }
    */

    deleteNote(noteLi) {
        fetch(`http://localhost:3000/notes/${this.id}`, {
            method: "DELETE"
        })
        .then(jsonToJS)
        .then (message => {
            noteLi.remove()
            Note.allNotes = Note.allNotes.filter(note => note.id !== this.id)
        }) 
    }


}



/*



function deleteNote(noteID, noteLi)
{
    debugger
    fetch(`http://localhost:3000/notes/${noteID}`, {
        method: "DELETE"
    }).then(jsonToJS)
    .then (message => {
        noteLi.remove()
    }) 
}
*/

function createNewNote(e) 
{
    //console.log("create new note")
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
    .then(todo => {
        let ul = document.getElementById(`note-${note.note_id}`)
        let newNote = new Note(note)
        newNote.appendNote(li)
    })

}




function destroyNoteGridChildren()
{
    const noteGrid = document.getElementById('noteGrid')
    while (noteGrid.hasChildNodes()){
        noteGrid.removeChild(noteGrid.lastChild);
    }
}
    
