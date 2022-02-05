import { useQuery } from '@apollo/client'
import { QUERY_BOOKCLUB } from '../utils/queries'
import { useParams } from 'react-router-dom'
import { useState, useReducer } from 'react'
import { Modal } from 'react-bootstrap'
import DateTimePicker from "react-datetime-picker";
import "react-datepicker/dist/react-datepicker.css";
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'

import Member from '../components/Member'
import BookTab from '../components/BookTab'
import Event from '../components/Event'
import Message from '../components/Message'
import { ADD_EVENT } from '../utils/mutations'
import { ADD_MESSAGE } from '../utils/mutations'

import { useMutation } from '@apollo/client'



export default function BookClub() {
    const [show, setShow] = useState(false);
    const [messagesExpanded, setMessagesExpanded] = useState(false)
    const [_, forceUpdate] = useReducer((x) => x + 1, 0);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { clubId } = useParams()
    let { data, loading } = useQuery(QUERY_BOOKCLUB, {
        variables: { clubId }
    })

    const bookClub = data?.bookClub || {}
    const bookData = {
        bookId: bookClub.bookId,
        title: bookClub.title,
        description: bookClub.description,
        imgUrl: bookClub.imgUrl,
        authors: bookClub.authors
    }

    const [formState, setFormState] = useState({ eventName: '', eventDate: new Date(), location: '', link: '', clubId: clubId, body: '' });
    const [addEvent, { eventData, loadingEvent }] = useMutation(ADD_EVENT);
    const [addMessage, { msgData, loadingMsg }] = useMutation(ADD_MESSAGE);

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
            case 'body':
                setFormState({ ...formState, body: e.target.value })
                break
        }
    }

    function handleDateChange(e) {
        console.log(e);
        setFormState({ ...formState, eventDate: e })
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

    function handleSubmitMessage(e) {
        e.preventDefault()
        if (!formState.body) {
            alert('You must provide a message')
            return
        }
        addMessage({
            variables: { ...formState, ...clubId }
        })
        e.target.reset()

        this.forceUpdate()
    }

    function toggleMessagesExpanded() {
        setMessagesExpanded(!messagesExpanded)
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
        <div className='p-4 pb-20'>
            <div>
                <BookTab book={bookData} isInClub={true} />
            </div>

            <div className='grid grid-cols-2 gap-3 bg-white'>

                <div className='col-span-1 p-3'>
                    <div className='flex flex-col gap-1'>
                        <h1 className='text-2xl font-bold leading-none align-text-bottom text-purple-900'>{bookClub.clubName}</h1>
                        <p className='text-sm'>Meets every {bookClub.meetingDay} at {bookClub.meetingTime}</p>
                        <p className='text-sm'>Reading Pace: {bookClub.speed}</p>
                    </div>
                    <div className='p-2'>
                        <p className="p-2 flex flex-col text-xl text-purple-900 bg-gray-300 border-4 text-center">Members ({bookClub.members.length})</p>
                        <div className='border-2 p-2 h-48 overflow-auto'>
                            {bookClub.members.map(member => <Member key={member._id} member={member} />)}
                        </div>
                    </div>
                </div>

                <div className='col-span-1'>
                    <>
                        <div className='p-2'>
                            <p className="p-2 text-xl text-purple-900 text-center">Meeting Dates</p>

                            <div className='p-2 overflow-auto'>
                                {bookClub.events.map(event => <Event key={event._id} event={event} />)}
                            </div>
                            <button className="p-1 m-2 text-sm text-purple-900 bg-gray-50 border-purple-900 border-2 rounded-lg h-8 float-right" onClick={handleShow}>
                                Add Event
                            </button>
                        </div>

                        <Modal show={show} onHide={handleClose}>
                            <form
                                className="w-full max-w-lg border-2 mx-auto"
                                onSubmit={handleSubmit}
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title className='text-purple-900'>Add New Event</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>

                                    <input className="p-2 outline-none text-sm bg-gray-100 text-gray-700 pr-2 h-12 rounded-full border-1 border-gray-300 w-full m-2"
                                        id="grid-first-name"
                                        type="text"
                                        placeholder="Event Name"
                                        onChange={handleChange}
                                        name='eventName'
                                    />
                                    <DateTimePicker className="p-2 outline-none text-sm bg-gray-100 text-gray-700 pr-2 h-12 rounded-full border-1 border-gray-300 w-full m-2"
                                        placeholder="Event Date"
                                        value={formState.eventDate}
                                        onChange={handleDateChange}
                                        name='eventDate'
                                    />
                                    <input className="p-2 outline-none text-sm bg-gray-100 text-gray-700 pr-2 h-12 rounded-full border-1 border-gray-300 w-full m-2"
                                        id="grid-first-name"
                                        type="text"
                                        placeholder="Location"
                                        onChange={handleChange}
                                        name='location'
                                    />
                                    <input className="p-2 outline-none text-sm bg-gray-100 text-gray-700 pr-2 h-12 rounded-full border-1 border-gray-300 w-full m-2"
                                        id="grid-first-name"
                                        type="text"
                                        placeholder="Event Link"
                                        onChange={handleChange}
                                        name='link'
                                    />


                                </Modal.Body>
                                <Modal.Footer>
                                    <button className='mx-auto py-2 px-4 text-gray-100 border-2 rounded-full bg-purple-900 border-purple-900' onClick={handleClose}>
                                        Add Event
                                    </button>
                                </Modal.Footer>
                            </form>
                        </Modal>
                    </>
                </div>

            </div>

            <div className='pb-12'>
                <div className=''>
                    <div className='p-2 text-2xl w-full text-purple-900 bg-gray-300 mt-3 border bg-white'>
                        <h3>Discussion</h3>
                        <div className={`p-1 flex flex-col-reverse overflow-auto gap-3 ${messagesExpanded ? 'expanded' : 'max-h-72'}`}>
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
                                {(messagesExpanded && <FaAngleUp />) || <FaAngleDown />}
                            </button>
                        </div>
                        <div className='p-2 border-1 rounded-lg w-full align-text-middle mt-3 bg-white'>
                            <form onSubmit={handleSubmitMessage}>
                                <textarea className="px-5 outline-none text-sm bg-gray-100 text-gray-700 rounded-full border-4 border-gray-200 w-full align-middle text-sm resize-none"
                                    onChange={handleChange}
                                    name='body'
                                    placeholder='Write your review here...'
                                    rows='4'
                                />

                                <button className="py-1 px-2 text-sm text-gray-100 border-2 rounded-full bg-purple-900 border-purple-900 m-2 flex">Publish</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}