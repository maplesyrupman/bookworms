import { useQuery } from '@apollo/client'
import { QUERY_BOOKCLUB } from '../utils/queries'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

import Member from '../components/Member'
import BookTab from '../components/BookTab'
import Message from '../components/Message'

import {FaAngleDown, FaAngleUp} from 'react-icons/fa'


export default function BookClub() {
    const { clubId } = useParams()
    const { data, loading } = useQuery(QUERY_BOOKCLUB, {
        variables: { clubId }
    })
    const [messagesExpanded, setMessagesExpanded] = useState(false)

    function toggleMessagesExpanded() {
        setMessagesExpanded(!messagesExpanded)
        if (messagesExpanded) {

        }
    }

    const bookClub = data?.bookClub || {}
    const bookData = {
        bookId: bookClub.bookId,
        title: bookClub.title,
        description: bookClub.description,
        imgUrl: bookClub.imgUrl,
        authors: bookClub.authors
    }

    if (loading) {
        return (
            <div>
                Loading...
            </div>
        )
    }
    return (
        <div className='pb-12'>
            <div>
                <BookTab book={bookData} isInClub={true} />
            </div>

            <div className='grid grid-cols-2 gap-2'>

                <div className='border-2 col-span-1 p-3'>
                    <div className='flex flex-col gap-1'>
                        <h1 className='text-2xl'>{bookClub.clubName}</h1>
                        <p>Meets every {bookClub.meetingDay} at {bookClub.meetingTime}</p>
                        <p>Reading Pace: {bookClub.speed}</p>
                    </div>
                    <div className='p-2'>
                        <h2>Members ({bookClub.members.length})</h2>
                        <div className='border-2 p-2 h-48 overflow-auto'>
                            {bookClub.members.map(member => <Member key={member._id} member={member} />)}
                        </div>
                    </div>
                </div>

                <div className='border-2 col-span-1'>
                    MEETING DATES COMPONENT
                </div>

            </div>

            <div className='p-2 border'>
                <div>
                    <div className={`border p-4 flex flex-col-reverse overflow-auto gap-3 ${messagesExpanded ? 'expanded' : 'max-h-96'}`}>
                        {bookClub.discussion.length && (
                            bookClub.discussion.map(message => <Message key={message._id} message={message} />)
                        ) || (
                                <div>
                                    <p className='text-center'>Start the discussion!</p>
                                </div>
                            )}
                    </div>
                    <div className='flex flex-row-reverse'>
                        <button 
                        onClick={toggleMessagesExpanded}
                        >
                            {(messagesExpanded && <FaAngleUp/>) || <FaAngleDown/>}
                        </button>
                    </div>
                </div>
                <div>
                    <form>
                        <textarea />
                        <button>Send</button>
                    </form>
                </div>
            </div>
        </div>
    )
}