import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import BookTab from '../components/BookTab'
import googleBook from '../utils/bookSearch'

export default function BookResults() {
    const [books, setBooks] = useState(undefined)
    const { query } = useParams()

    useEffect(async () => {
        if (!books) {
            googleBook(query)
                .then(setBooks)
        }



    }, [books])

    return (
        <div>
            {books && (
                books.map(book => <BookTab key={book.imgUrl} book={book} />)
            )}

            {!books && (
                <div>Loading</div>
            )}
        </div>
    )
}