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
            .then(results => {
                setBooks(results)
            })
    }, [query])

    return (
        <div className="p-4">
        <p className="p-2 flex flex-col text-2xl text-purple-900 bg-gray-300 border-4 text-center">Search results for "{query}"</p>
        {books && (
                books.map(book => book.authors ? <BookTab key={book.imgUrl} book={book} isInSearch={true} /> : null)
            )}

            {!books && (
                <div>Loading</div>
            )}
        </div>
    )
} 