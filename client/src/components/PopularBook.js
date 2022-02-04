import { FaDoorOpen } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { JOIN_CLUB } from '../utils/mutations'
import Auth from '../utils/auth'

export default function PopularBook({ clubData, onProfile }) {
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
        <div className={`border-b-4 p-2 ${onProfile ? 'flex' : 'grid grid-cols-1'}`}>
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
                        <div className='flex justify-left gap-2'>
                            <img className='h-16'
                            src={`https://books.google.com/books/content?id=${clubData.bookId}&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api`}></img>
                        
                        <a href={`https://play.google.com/store/books/details?id=${clubData.bookId}`}>
                            <p className='text-base font-bold leading-none align-text-bottom text-purple-900'>{clubData.title}</p>
                            </a>
                        </div>

                    </>
                )}


        </div>
    )
}