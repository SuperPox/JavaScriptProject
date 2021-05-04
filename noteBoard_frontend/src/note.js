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
        noteDelete.addEventListener('click', (e) => deleteNote(note.id))
        noteLi.append(noteDelete)
        ul.append(noteLi)
    }
}

function deleteNote(noteID)
{
    console.log(noteID)
    fetch(`http://localhost:3000/notes/${noteID}`, {method: "DELETE"})
}