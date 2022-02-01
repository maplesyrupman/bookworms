import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { QUERY_BOOKCLUBS } from "../utils/queries"
import { useSelector } from 'react-redux'

import ClubTab from "../components/ClubTab"
import BookTab from "../components/BookTab"

export default function ClubsList() {
    const { bookId } = useParams()
    const { loading, data } = useQuery(QUERY_BOOKCLUBS, { variables: { bookId } })
    const book = useSelector((state) => state.currentBook)

    if (loading) {
        return (
            <div>Loading Clubs...</div>
        )
    } else if (!book.title) {
        window.location.replace('/')
    }

    return (
        <div>
            <BookTab book={book} isInSearch={false} />
            <div className="flex flex-col gap-2">
                {
                data.bookClubs.length && 
                data.bookClubs.map(club => <ClubTab key={club._id} clubData={club} onProfile={false} />)
                }
            </div>
        </div>
    )

}