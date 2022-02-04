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
        <div className={`border-b-4 h-20 p-2 ${onProfile ? 'flex' : 'grid grid-cols-2'}`}>
            {(onProfile && (
                <>
                    <div>
                        <p className='text-base font-bold leading-none align-text-bottom text-purple-900'>
                            <Link to={`/club/${clubData._id}`}>
                                {clubData.clubName}
                            </Link>
                        </p>
                        <div>
                            <p>{clubData.title} by {clubData.authors[0]}</p>
                        </div>
                    </div>
                    {/* <div className="flex justify-center items-center">
                        <button
                            onClick={openClub}
                        >
                            <FaDoorOpen />
                        </button>
                    </div> */}
                </>
            )) || (
                    <>
                        <div className='justify-left'>
                            <p className='text-base font-bold leading-none align-text-bottom text-purple-900'>{clubData.clubName}</p>
                            <p className='text-xs text-gray-500'>{clubData.meetingDay} at {clubData.meetingTime}</p>
                            <p className='text-xs text-gray-500'>Reading Pace: {clubData.speed.toLowerCase()}</p>

                        </div>
                    
                        <div className='flex justify-end gap-3'>
                            <p className='text-sm border-1 bg-gray-200 border-gray-400 h-8 w-28 p-1 text-center'>{clubData.members.length} member(s)</p>
                            {Auth.loggedIn() && (
                                <button
                                    type='button'
                                    onClick={handleJoin}
                                    className='p-1 text-sm text-purple-900 bg-gray-50 border-purple-900 border-2 rounded-lg h-8 w-16'
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