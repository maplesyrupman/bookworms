function googleBook(query) {
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
    .then(data => data.json())
    .then(data => {
        const books = data.items.map(extractBookData)
        return books
    })
}

function extractBookData(book) {
    
    const data = {}
    try {
        data.bookId = book.id
        data.title = book.volumeInfo.title
        data.authors = book.volumeInfo.authors
        data.description = book.volumeInfo.description
        data.imgUrl = book.volumeInfo.imageLinks.smallThumbnail
    } catch (err) {
        return false
    }

    
    return data
}

export default googleBook