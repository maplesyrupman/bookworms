import { useQuery } from '@apollo/client'
import { QUERY_BOOKCLUB } from '../utils/queries'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Member from '../components/Member'
import BookTab from '../components/BookTab'
import Event from '../components/Event'
import { ADD_EVENT } from '../utils/mutations'
import { useMutation } from '@apollo/client'


import Message from '../components/Message'
import {FaAngleDown, FaAngleUp} from 'react-icons/fa'


export default function BookClub() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

    const [formState, setFormState] = useState({ eventName: '', eventDate: '', location: '', link: '', clubId: clubId });
    const [addEvent, { eventData, loadingEvent }] = useMutation(ADD_EVENT);
    const [eventDt, setEventDt] = useState(new Date());

    function handleChange(e) {
        switch (e.target.name) {
            case 'eventName':
                setFormState({ ...formState, eventName: e.target.value })
                break
            case 'location':
                setFormState({ ...formState, location: e.target.value })
                break
            case 'link':
                setFormState({ ...formState, link: e.target.value })
                break
        }
    }

    function handleDateChange(e) {
        setFormState({ ...formState, eventDate: e })
        setEventDt = e;
    }


    function handleSubmit(e) {
        e.preventDefault()
        if (!formState.eventName) {
            alert('You must provide a name for the event')
            return
        }
        addEvent({
            variables: { ...formState, ...clubId }
        })

        window.location.reload();
    }

    if (loading) {
        return (
            <div>
                Loading...
            </div>
        )
    } else {
        console.log(data)
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
                    Meeting Dates
                    <>
                        <button className="btn bg-sky-600 hover:bg-sky-700 float-right" onClick={handleShow}>
                            Add Event
                        </button>
                        <div className='p-2'>
                            <h2>Events ({bookClub.events.length})</h2>
                            <div className='border-2 p-2 overflow-auto'>
                                {bookClub.events.map(event => <Event key={event._id} event={event} />)}
                            </div>
                        </div>

                        <Modal show={show} onHide={handleClose}>
                            <form
                                className="w-full max-w-lg border-2 mx-auto"
                                onSubmit={handleSubmit}
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>Add New Event</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>

                                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                        id="grid-first-name"
                                        type="text"
                                        placeholder="Event Name"
                                        onChange={handleChange}
                                        name='eventName'
                                    />
                                    <DatePicker className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                        placeholder="Event Date"
                                        selected={eventDt}
                                        onChange={(date) => {
                                            setEventDt(date);
                                            setFormState({ ...formState, eventDate: date })
                                        }
                                        }
                                        name='eventDate'
                                    />
                                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                        id="grid-first-name"
                                        type="text"
                                        placeholder="Location"
                                        onChange={handleChange}
                                        name='location'
                                    />
                                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                        id="grid-first-name"
                                        type="text"
                                        placeholder="Event Link"
                                        onChange={handleChange}
                                        name='link'
                                    />


                                </Modal.Body>
                                <Modal.Footer>
                                    <button className='btn bg-sky-600 hover:bg-sky-700' onClick={handleClose}>
                                        Add
                                    </button>
                                </Modal.Footer>
                            </form>
                        </Modal>
                    </>
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