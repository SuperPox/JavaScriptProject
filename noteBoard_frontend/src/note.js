function appendNotes(notes, element)
{
    const ul = document.createElement('ul')
    element.append(ul)

    for (let note of notes) 
    {
        const noteLi = document.createElement("li")
        noteLi.innerText = note.content
        ul.append(noteLi)
    }
}