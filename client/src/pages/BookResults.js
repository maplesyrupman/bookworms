import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import BookTab from '../components/BookTab'
import googleBook from '../utils/bookSearch'

export default function BookResults() {
    const [books, setBooks] = useState(undefined)
    const { query } = useParams()

    useEffect(async () => {
        setBooks(undefined)

        googleBook(query)
            .then(setBooks)

    }, [query])

    return (
        <div>
            {books && (
                books.map(book => book.authors ? <BookTab key={book.imgUrl} book={book} /> : null)
            )}

            {!books && (
                <div>Loading</div>
            )}
        </div>
    )
}