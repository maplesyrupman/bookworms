import { useQuery } from '@apollo/client'
import { QUERY_BOOKCLUB } from '../utils/queries'
import { useParams } from 'react-router-dom'

import Member from '../components/Member'
import BookTab from '../components/BookTab'

export default function BookClub() {
    const { clubId } = useParams()
    const { data, loading } = useQuery(QUERY_BOOKCLUB, {
        variables: { clubId }
    })
    console.log(data)
    const bookClub = data?.bookClub || {}
    const bookData = {
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
        <div>
            <div>
                <BookTab book={bookData} isInClub={true} />
            </div>

            <div className='grid grid-cols-2 gap-2'>

                <div className='border-2 col-span-1'>
                    <div>
                        <h1>{bookClub.clubName}</h1>
                    </div>
                    <div>
                        <h2>Members</h2>
                        <div>
                            {bookClub.members.map(member => <Member member={member} /> )}
                        </div>
                    </div>
                </div>

                <div className='border-2 col-span-1'>
                    MEETING DATES COMPONENT
                </div>

            </div>

            <div>
                DISCUSSION & FORM
            </div>
        </div>
    )
}