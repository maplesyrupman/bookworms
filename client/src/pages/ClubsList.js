import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { QUERY_BOOKCLUBS } from "../utils/queries"

import ClubTab from "../components/ClubTab"

export default function ClubsList() {
    const {bookId} = useParams()
    const {loading, data} = useQuery(QUERY_BOOKCLUBS, {variables: {bookId}})

    if (loading) {
        return (
            <div>Loading Clubs...</div>
        )
    } else {
        console.log(data)
    }

    return (
        <div>
            {data.bookClubs.map(club => <ClubTab key={club._id} clubData={club} onProfile={false}/>)}
        </div>
    )

}