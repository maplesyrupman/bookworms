import React from 'react'
import { useState } from 'react'
import { useQuery } from "@apollo/client"
import { QUERY_USER, UPCOMING_EVENTS } from '../utils/queries'
import {UPDATE_USER} from '../utils/mutations'
import Auth from '../utils/auth'
import ClubTab from "../components/ClubTab"
import { useParams } from 'react-router-dom'
import BookTab from '../components/BookTab'
import googleBook from '../utils/bookSearch'
import Event from '../components/Event'
import { FaBookmark, FaUserCircle } from 'react-icons/fa'
import FavBookSearchResult from '../components/FavBookSearchResult'


export default function Profile() {

    const uploadedImage = React.useRef(null);
    const imageUploader = React.useRef(null);

    const [status, setStatus] = useState(null)
    const [print, setPrint] = useState(false)
    const [favBook, setFavBook] = useState(undefined)

    const [editMode, setEditMode] = useState(false)
    const [profileData, updateProfileData] = useState({})
    const [favBookResults, setFavBookResults] = useState(undefined)

    const { data: events, loading: eventsLoading } = useQuery(UPCOMING_EVENTS)

    let { userId } = useParams()
    userId = userId ? userId : Auth.getProfile().data._id

    const { data, loading } = useQuery(QUERY_USER, { variables: { userId } })
    const { _id, username, bio, bookClubs } = data?.user || {}


    const handleImageUpload = e => {
        const [file] = e.target.files;
        if (file) {
            const reader = new FileReader();
            const { current } = uploadedImage;
            current.file = file;
            reader.onload = (e) => {
                current.src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    }

    // function getStatus(e) {
    //     console.warn(e.target.value)
    //     setStatus(e.target.value)
    //     setPrint(false)
    // }

    // function submitStatus() {
    //     console.debug("Submit status called")
    //     const statusBox = document.getElementById("statusBox")
    //     statusBox.value = ""
    //     setPrint(true)
    // }

    function toggleEdit() {
        setEditMode(!editMode)
    }

    function updateBio(e) {
        updateProfileData({ ...profileData, bio: e.target.value })
    }

    function updateFavBook(e) {
        const div = e.target
        const favBook = {
            favBookTitle: div.dataset.title,
            favBookAuthors: div.dataset.authors,
            favBookDescription: div.dataset.description,
            favBookImgUrl: div.dataset.imgurl,
            favBookBookId: div.dataset.bookid
        }

        updateProfileData({ ...profileData, favBook})
        console.log(profileData)
    }

    async function searchFavBook(e) {

        e.preventDefault()
        const title = e.target[0].value
        const books = await googleBook(title)
        books.forEach(book => console.log(book.authors))
        setFavBookResults(books.map(book => book ? <FavBookSearchResult book={book} key={book.bookId}  /> : null))
    }



    if (loading) {
        return (
            <div>
                Loading profile...
            </div>
        )
    }

    return (
        <div >
            <div className="grid grid-cols-6" style={{ marginBottom: "20px", padding: "20px", border: "2px solid black" }}>
                <div
                    style={{
                        height: "200px",
                        width: "200px",
                    }}
                    className='col-span-1'
                >
                    <FaUserCircle
                    className='h-full w-full'
                    />
                </div>
                <div
                className='col-span-2'
                >
                    <div className=''>
                        <h2>{username}</h2>
                        <button
                            className='ml-4'
                            onClick={toggleEdit}
                        >
                            {editMode ? 'save' : 'edit'}
                        </button>
                    </div>
                    {
                        !editMode && (
                            <div>
                                <p>{bio}</p>
                            </div>
                        ) || (
                            <div>
                                <textarea style={{ width: "250px", border: "2px solid black", borderRadius: "5px" }}
                                    onChange={updateBio}
                                    defaultValue={bio}
                                />
                            </div>
                        )
                    }
                </div>
                <div className='col-span-3'>
                    <div>
                        <h2>My Favourite Book</h2>
                    </div>

                    {
                        (editMode && (
                            <div>
                                <form onSubmit={searchFavBook}>
                                    <div>
                                        <label htmlFor='favBookSearch'>Favourite Book:</label>
                                        <input type='text' name='favBookSearch' className='mx-2' />
                                        <button>Search</button>
                                    </div>
                                </form>
                                <div 
                                id='favBookSearchResults'
                                className='overflow-auto max-h-200px border p-1 flex flex-col gap-1'
                                onClick={updateFavBook}
                                >
                                    {favBookResults}
                                </div>
                            </div>
                        ))
                    }
                    <div>

                    </div>
                </div>

                {/* <div>
                    <div>
                        <label style={{ fontWeight: 'bold' }}>Thought of the Day: </label>
                        {print ? <p style={{ fontFamily: "cursive" }}>{status}</p> : null}
                    </div>
                    <br />
                    <div>
                        <input id="statusBox" style={{ height: "40px", border: "2px solid black", borderRadius: "5px", marginBottom: "10px" }} type="text" defaultValue={status} onChange={getStatus} />

                    </div>
                    <button onClick={submitStatus} className="btn btn-blue">Submit</button>
                </div> */}


            </div>


            <h2>Popular Books</h2>
            <div className="grid grid-cols-1" style={{ marginTop: "50px", height: "300px", border: "2px solid black" }}>
                {/* <div >
                    {books && (
                        books.map(book => book.authors ? <BookTab key={book.imgUrl} book={book} isInSearch={true} /> : null)
                    )}
                    {!books && (
                        <div>Loading</div>
                    )}
                </div> */}
            </div>
            <div className="grid grid-cols-2">
                <div>
                    <h2>Your Clubs:</h2>
                    <div className="flex flex-col gap-2">
                        {data.user.bookClubs.map(club => <ClubTab key={club._id} clubData={club} onProfile={true} />)}
                    </div>
                </div>
                <div>
                    <h2>Upcoming Meetings</h2>
                    <div className="flex flex-col gap-2">
                        {events.upcomingEvents.map(event => <Event key={event._id} event={event} />)}
                    </div>
                </div>

            </div>
        </div >
    )
}