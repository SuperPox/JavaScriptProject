
boardForm.addEventListener('submit', postBoard)
fetchBoards()


function jsonToJS(response)
{
    return response.json()
}