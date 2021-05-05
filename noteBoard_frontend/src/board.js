
// VARS
const boardForm = document.getElementById('boardForm')



//////////////////////////////////////////////////////////////////
// Vars
//const fill = document.querySelector('.fill');
var fill = document.querySelector('.fill');
const fills = document.querySelectorAll('.fill');

const empties = document.querySelectorAll('.empty');
const emptiesArr = []

// Global Listener
function addGlobalEventListener(type, selector, callback) {
    document.addEventListener(type, e => {
        if (e.target.matches(selector)) callback(e)
    })
}

addGlobalEventListener("dragstart", "div", e => {
    fill = e.target
})

// Fill Listeners
fill.addEventListener('dragstart', dragStart);
fill.addEventListener('dragend', dragEnd);

// Loop through Empties
for (const empty of empties)
{
    empty.addEventListener('dragover', dragOver);
    empty.addEventListener('dragenter', dragEnter);
    empty.addEventListener('dragleave', dragLeave);
    empty.addEventListener('drop', dragDrop);
}

// Drag Functions
function dragStart()
{
    this.className += ' hold';
    setTimeout(() => (this.className = 'invisible'), 0);
}
function dragEnd()
{
    this.className = 'fill';
}
function dragOver(e)
{
    e.preventDefault();
}
function dragEnter(e)
{
    e.preventDefault();
    this.className += ' hovered';
}
function dragLeave()
{
    this.className = 'empty';
}
function dragDrop()
{
    this.className = 'empty';
    this.append(fill);
}

///////////////////////////////////////////////////////////////////

function fetchBoards()
{
    fetch('http://localhost:3000/boards')
    .then(jsonToJS)
    .then(boards => {appendBoards(boards)})
    //.then(boards => {appendColumn(boards)})
    //.then(appendBoards)
    //.then(boards => {console.log(boards)})
}

function appendBoards(boards)
{ 
    for (let e of empties)
    {
        emptiesArr.push(e)
    }
    
    for (let board of boards)
    {
        appendBoard(board)
    }

    boards.forEach(e => appendToGrid(e))
   


}

function appendToGrid(board)
{
    const gridZone = document.getElementById("gridZone")

    const emptyDiv = document.createElement('div')
    emptyDiv.className = "empty"
    emptyDiv.addEventListener('dragover', dragOver);
    emptyDiv.addEventListener('dragenter', dragEnter);
    emptyDiv.addEventListener('dragleave', dragLeave);
    emptyDiv.addEventListener('drop', dragDrop);

    const gridDiv = document.createElement('div')
    gridDiv.className = "fill"
    gridDiv.draggable = "true"
    gridDiv.innerText = board.name
    gridZone.append(emptyDiv)
    emptyDiv.append(gridDiv)
}


function appendBoard(board) 
{
    /*
    const boardDiv = document.getElementById('boards')
    const li = document.createElement("li")
    li.innerText = board.name
    li.addEventListener('click', (e) => renderBoardShowPage(board))
    boardDiv.append(li)
    appendNotes(board.notes, li)   
    

    const boardDiv = document.getElementById('boardContainer2')

    const div = document.createElement('div')
    div.className = "col-sm gridC4"
    div.innerText = board.name
    boardDiv.append(div) 

    const tpSpace = document.createElement('div')
    tpSpace.className = "col-sm gridTP"
    tpSpace.innerText = "XXXXX"
    boardDiv.append(tpSpace)
    */

}


function renderBoardShowPage(board)
{
    const boardContainer = document.getElementById('boardContainer')
    //boardContainer.children[1].innerHTML = ""
    boardContainer.children[0].remove()
    appendBoard(board)
    appendNoteForm()
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