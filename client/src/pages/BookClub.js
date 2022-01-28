import { useQuery } from '@apollo/client'
import { QUERY_BOOKCLUB } from '../utils/queries'
import { useParams } from 'react-router-dom'

import Member from '../components/Member'
import BookTab from '../components/BookTab'

export default function BookClub() {
    const { bookClubId } = useParams()
    const { data, loading } = useQuery(QUERY_BOOKCLUB, {
        variables: { bookClubId }
    })
    const bookClub = data?.bookClub || {}
    const bookData = {
        title: bookClub.bookTitle,
        description: bookClub.bookDescription,
        imgUrl: bookClub.bookImgUrl,
        authors: bookClub.bookAuthors
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
                <BookTab book={bookData} />
            </div>

            <div className='flex '>
                <div>
                    <div>
                        <h1>{bookClub.bookClubName}</h1>
                    </div>
                    <div>
                        <h2>Members</h2>
                        <div>
                            {bookClub.members.map(member => <Member member={member} /> )}
                        </div>
                    </div>
                </div>

                <div>
                    MEETING DATES COMPONENT
                </div>
            </div>

            <div>
                DISCUSSION & FORM
            </div>
        </div>
    )
}