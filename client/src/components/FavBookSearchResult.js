export default function FavBookSearchResult({book}) {
    return (
        <div 
        className="flex p-0.5 border hover:cursor-pointer hover:bg-purple-300"
        data-title={book.title}
        data-authors={book.authors}
        data-description={book.description}
        data-imgurl={book.imgUrl}
        data-bookid={book.bookId}
        >
        {book.title} by {book.authors[0]}
        </div>
    )
}