const boardForm = document.getElementById('boardForm')

class Board {
    
    static allBoards = []
    
    constructor({name, id, notes}) {
        this.name = name
        this.id = id
        //this.notes = board.notes.map(note => new Note(note))
        notes.forEach(note => new Note(note))
        Board.allBoards.push(this)
    }

    get notes() {
        return Note.allNotes.filter(note => note.boardId === this.id)
    }

    static fetchBoards() {
        fetch('http://localhost:3000/boards')
        .then(jsonToJS)
        .then(this.appendBoards)
    }

    static appendBoards(boards) { 
        for (let board of boards) {
            let newBoard = new Board(board)
            newBoard.appendToGrid()
            newBoard.appendToContainer(board)}
    }

    static postBoard(e) {
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
        .then(board => {
            let newBoard = new Board(board)
            newBoard.appendToGrid()
            newBoard.appendToContainer(board)
        })
    }

    appendToGrid() {
        
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
        gridDiv.innerText = this.name
        gridDiv.addEventListener('dblclick', this.renderBoardShowPage.bind(this))
        //gridDiv.addEventListener('dblclick', () => this.renderBoardShowPage())
    
        gridZone.prepend(emptyDiv)
        emptyDiv.prepend(gridDiv)

    }

    appendToContainer(board) {
        const sortContainer = document.getElementById("sortableBoardContainer")
        const newSortableBoard = document.createElement('p')
        
        const referenceDiv = document.createElement('div')
        const referenceType = "board"
        const referenceId = board.id
        referenceDiv.innerHTML = `${referenceType} ${referenceId}`
        referenceDiv.className = "invisible"
      
        newSortableBoard.className = "draggable"
        newSortableBoard.draggable = "true"
        newSortableBoard.innerHTML = this.name
        newSortableBoard.addEventListener('dblclick', this.renderBoardShowPage.bind(this))
        
        sortContainer.appendChild(newSortableBoard)
        newSortableBoard.appendChild(referenceDiv)

        refreshDraggables()
    }


    renderBoardShowPage() {   
        const homeView = document.getElementById("homeContainer")
        homeView.className = "navHidden"

        const boardView = document.getElementById("insideBoard")
        boardView.className = "navVisible"

        const navAreaAllBoards= document.getElementById("navAreaAllBoards")
        navAreaAllBoards.className = "navVisible"

        const navAreaSingleBoard = document.getElementById("navAreaSingleBoard")
        navAreaSingleBoard.className = "navVisible"
        navAreaSingleBoard.innerHTML = `<h4>${this.name}</h4>`

        const secretBoardID = document.getElementById("secretBoardID")
        secretBoardID.innerText = this.id
        const secretBoardObject = document.getElementById("secretBoardObject") 
        secretBoardObject.innerText = JSON.stringify(this.notes)
        
        Note.displayNoteGrid(this.notes) 
    }
}

function deleteBoardObject(refId) {
    fetch(`http://localhost:3000/boards/${refId}`, {
        method: "DELETE"
    })
    .then(jsonToJS)
    .then (m => {
        emptyTrash();
    })
}

///////////////////////////////////////////////////////////////////////
// NAVIGATION

function returnToHomeView()
{
    // Shows Boards "Page"
    const homeView = document.getElementById("homeContainer")
    homeView.append()
    homeView.className = "navVisible"

    //Hide Notes "Page"
    const navAreaSingleBoard = document.getElementById("insideBoard")
    navAreaSingleBoard.className = "navHidden"  
    
    //Remove Notes
    const noteGrid = document.getElementById('noteGrid')
    while (noteGrid.hasChildNodes()){
        noteGrid.removeChild(noteGrid.lastChild);
    }
    
}

//
///////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////
// GRID SYSTEM
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



