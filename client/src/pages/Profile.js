import { useQuery } from "@apollo/client"
import { QUERY_USER } from '../utils/queries'
import Auth from '../utils/auth'
import ClubTab from "../components/ClubTab"

export default function Profile() {
    const { _id, username } = Auth.getProfile().data
    const { data, loading } = useQuery(QUERY_USER, { variables: { userId: _id } })

    if (loading) {
        return (
            <div>
                Loading your profile...
            </div>
        )
    }

    return (
        <div>
            <div>
                <h2>{username}</h2>
            </div>
            <div className="grid grid-cols-2">
                <div>
                    <h2>Your Clubs:</h2>
                    <div className="flex flex-col gap-2">
                        {data.user.bookClubs.map(club => <ClubTab key={club._id} clubData={club} />)}
                    </div>
                </div>
                <div>
                    UPCOMING MEETINGS
                </div>
            </div>
        </div>
    )
}