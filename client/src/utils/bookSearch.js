function googleBook(query) {
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
    .then(data => data.json())
    .then(data => {
        const books = data.items.map(extractBookData)
        return books
    })
}

function extractBookData({volumeInfo: book}) {
    const data = {}
    try {
        data.title = book.title
        data.authors = book.authors
        data.description = book.description
        data.imgUrl = book.imageLinks.smallThumbnail
    } catch (err) {
        return false
    }

    
    return data
}

export default googleBook