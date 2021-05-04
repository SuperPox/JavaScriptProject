function appendNotes(notes, element)
{
    for (let note of notes) 
    {
        const noteLi = document.createElement("li")
        noteLi.innerText = note.content
        element.append(noteLi)
    }
}