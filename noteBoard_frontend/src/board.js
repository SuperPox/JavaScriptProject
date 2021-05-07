const boardForm = document.getElementById('boardForm')

class Board {
    
    static allBoards = []
    constructor({name, id, notes}) {
        this.name = name
        this.id = id
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
            newBoard.appendToContainer(board)
        })
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
        
        Note.appendToNoteContainer(this.notes)
    }
}
//ActiveRecord::InvalidForeignKey
function deleteBoardObject(refId) {
    //let refToStringId = refId.toString()
    fetch(`http://localhost:3000/boards/${refId}`, {
        method: "DELETE"
    })
    .then(jsonToJS)
    .then (m => {
        emptyTrash();
        Board.allBoards = Board.allBoards.filter(board => board.id !== refId)
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

    //Hide Note "Title"
    const navNoteTitle = document.getElementById("navAreaSingleBoard")
    navNoteTitle.className = "navHidden"
    
    //Remove Notes
    const noteGrid = document.getElementById('sortableNoteContainer')
    while (noteGrid.hasChildNodes()){
        noteGrid.removeChild(noteGrid.lastChild);
    }
}

