
boardForm.addEventListener('submit', Board.postBoard)
noteForm.addEventListener('submit', Note.postNote)

Board.fetchBoards()

function jsonToJS(response)
{
    return response.json()
}