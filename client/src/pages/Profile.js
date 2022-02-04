import React from 'react'
import { useState } from 'react'
import { useQuery } from "@apollo/client"
import { QUERY_USER, FAV_BOOK, UPCOMING_EVENTS } from '../utils/queries'
import Auth from '../utils/auth'
import ClubTab from "../components/ClubTab"
import ReactDom from "react-dom"
import { useParams } from 'react-router-dom'
import BookTab from '../components/BookTab'
import googleBook from '../utils/bookSearch'
import Event from '../components/Event'
import { FaUserCircle } from 'react-icons/fa'
import { Modal } from 'react-bootstrap'

export default function Profile() {

    const uploadedImage = React.useRef(null);
    const imageUploader = React.useRef(null);

    const [status, setStatus] = useState(null)
    const [print, setPrint] = useState(false)

    const [editMode, setEditMode] = useState(false)
    const [profileData, updateProfileData] = useState({})

    const { data: favBookData, loading: favBookLoading } = useQuery(FAV_BOOK, { variables: { bookId: 'blah' } })
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

    function getStatus(e) {
        console.warn(e.target.value)
        setStatus(e.target.value)
        setPrint(false)
    }

    function submitStatus() {
        console.debug("Submit status called")
        const statusBox = document.getElementById("statusBox")
        statusBox.value = ""
        setPrint(true)
    }

    function toggleEdit() {
        console.log(editMode)
        setEditMode(!editMode)
    }

    function updateBio(e) {
        updateProfileData({ ...profileData, bio: e.target.value })
    }



    if (loading) {
        return (
            <div>
                Loading profile...
            </div>
        )
    }
    console.log(bio)

    return (
        <div >
            <div className="p-4 grid grid-cols-2 bg-white">
                <div>
                    <p className="text-6xl font-bold p-2 text-gray-300"><FaUserCircle /></p>
                    <p className='text-3xl p-2 text-purple-900'>{username}</p>
                </div>
            
                <div className='justify-end'>
                    <div>
                        <label style={{ fontWeight: 'bold' }}>Thought of the Day: </label>
                        {print ? <p style={{ fontFamily: "cursive" }}>{status}</p> : null}
                    </div>
                    <div>
                        <input id="statusBox" style={{ height: "40px", border: "2px solid black", borderRadius: "5px", marginBottom: "10px" }} type="text" defaultValue={status} onChange={getStatus} />
                    </div>
                    <button onClick={submitStatus} className="p-1 text-sm text-purple-900 bg-gray-50 border-purple-900 border-2 rounded-lg h-8 w-16=">Submit</button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className='bg-white'>
                <p className="p-2 flex flex-col text-2xl text-purple-900 bg-gray-300 border-4 text-center">Your Clubs</p>
                    <div className="flex flex-col gap-2">
                        {data.user.bookClubs.map(club => <ClubTab key={club._id} clubData={club} onProfile={true} />)}
                    </div>
                </div>
                <div className='bg-white'>
                <p className="p-2 flex flex-col text-2xl text-purple-900 bg-gray-300 border-4 text-center">Upcoming Meetings</p>
                    <div className="flex flex-col gap-2">
                        {events.upcomingEvents.map(event => <Event key={event._id} event={event} />)}
                    </div>
                </div>

            </div>
        </div >
    )
}