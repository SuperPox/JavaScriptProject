
function fetchBoards()
{
    fetch('http://localhost:3000/boards')
    .then(response => response.json())
    .then(boards => {appendBoards(boards)})
    //.then(appendBoards)
    //.then(boards => {console.log(boards)})
}

function appendBoards(boards)
{
    const boardDiv = document.getElementById('boards')
    //debugger;
    for (let board of boards)
        {
            const li = document.createElement("li")
            li.innerText = board.name
            boardDiv.append(li)
            appendNotes(board.notes, li)
        }
}