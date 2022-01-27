function setCurrentBook(book) {
    return {
        type: "SET_CURRENT_BOOK",
        payload: book
    }
}

export { setCurrentBook }