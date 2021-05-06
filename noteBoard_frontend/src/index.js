
boardForm.addEventListener('submit', Board.postBoard)
Board.fetchBoards()


function jsonToJS(response)
{
    return response.json()
}