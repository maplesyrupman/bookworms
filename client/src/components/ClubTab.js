import { FaDoorOpen } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { JOIN_CLUB } from '../utils/mutations'
import Auth from '../utils/auth'

export default function ClubTab({ clubData, onProfile }) {
    const navigate = useNavigate()
    const [joinClub] = useMutation(JOIN_CLUB)

    function openClub() {
        navigate(`/club/${clubData._id}`)
    }

    function handleJoin() {
        joinClub({
            variables: { clubId: clubData._id }
        })
        openClub()
    }

    return (
        <div className={`border rounded-lg p-4 bg-green-300 ${onProfile ? 'flex justify-between' : 'grid grid-cols-3'}`}>
            {(onProfile && (
                <>
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
                </>
            )) || (
                    <>
                        <h2 className='text-xl leading-none align-text-bottom'>{clubData.clubName}</h2>
                        <div className='flex justify-center'>
                            <p className=''>{clubData.meetingDay} at {clubData.meetingTime} ({clubData.speed.toLowerCase()}) with {clubData.members.length} members</p>
                        </div>
                        <div className='flex justify-end'>
                            {Auth.loggedIn() && (
                                <button
                                    type='button'
                                    onClick={handleJoin}
                                >
                                    Join
                                </button>
                            )}
                        </div>

                    </>
                )}


        </div>
    )
}