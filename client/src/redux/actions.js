function setCurrentBook(book) {
    return {
        type: "SET_CURRENT_BOOK",
        payload: book
    }
}

function setCurrentClub(club) {
    return {
        type: "SET_CURRENT_CLUB",
        payload: club
    }
}

export { 
    setCurrentBook,
    setCurrentClub
}