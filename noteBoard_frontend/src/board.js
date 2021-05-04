
// VARS
const boardForm = document.getElementById('boardForm')

//

function fetchBoards()
{
    fetch('http://localhost:3000/boards')
    .then(jsonToJS)
    .then(boards => {appendBoards(boards)})
    //.then(appendBoards)
    //.then(boards => {console.log(boards)})
}

function appendBoards(boards)
{ 
    for (let board of boards)
    {
        appendBoard(board)
    }
}

function appendBoard(board) 
{
    const boardDiv = document.getElementById('boards')
    const li = document.createElement("li")
    li.innerText = board.name
    boardDiv.append(li)
    appendNotes(board.notes, li)
}


function postBoard(e)
{
    e.preventDefault()
    const userInput = e.target.children[1].value
    const body = {
        board: {
            name: userInput
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
    fetch('http://localhost:3000/boards', options)
    .then(jsonToJS)
    .then(appendBoard)

}