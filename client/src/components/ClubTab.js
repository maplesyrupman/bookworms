import { FaDoorOpen } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'

export default function ClubTab({ clubData }) {
    const navigate = useNavigate()

    function openClub() {
        navigate(`/club/${clubData._id}`)
    }

    return (
        <div className="border rounded-lg p-4 bg-green-300 flex justify-between">
            <div>
                <h2>
                    <Link to={`/club/${clubData._id}`}>
                        {clubData.clubName}
                    </Link>
                </h2>
                <div>
                    <p>Reading {clubData.title} by {clubData.authors[0]}</p>
                </div>
            </div>

            <div className="flex justify-center items-center">
                <button
                onClick={openClub}
                >
                    <FaDoorOpen />
                </button>
            </div>
        </div>
    )
}