import { useQuery } from '@apollo/client'
import { QUERY_BOOKCLUB } from '../utils/queries'
import { useParams } from 'react-router-dom'
import { useState, useReducer } from 'react'
import { Modal } from 'react-bootstrap'
import DateTimePicker from "react-datetime-picker";
import "react-datepicker/dist/react-datepicker.css";

import Member from '../components/Member'
import BookTab from '../components/BookTab'
import Event from '../components/Event'
import { ADD_EVENT } from '../utils/mutations'
import { ADD_MESSAGE } from '../utils/mutations'

import { useMutation } from '@apollo/client'
import Collapsible from 'react-collapsible';


import Message from '../components/Message'

export default function BookClub() {
    const [show, setShow] = useState(false);
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
        console.log(formState);
        if (!formState.body) {
            alert('You must provide a message')
            return
        }
        addMessage({
            variables: { ...formState, ...clubId }
        })
        this.forceUpdate()
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
        <div className='p-4 pb-12'>
            <div>
                <BookTab book={bookData} isInClub={true} />
            </div>

            <div className='grid grid-cols-2 gap-3 bg-white'>

                <div className='border-2 col-span-1 p-3'>
                    <div className='flex flex-col gap-1'>
                        <h1 className='text-2xl font-bold leading-none align-text-bottom text-purple-900'>{bookClub.clubName}</h1>
                        <p className='text-sm'>Meets every {bookClub.meetingDay} at {bookClub.meetingTime}</p>
                        <p className='text-sm'>Reading Pace: {bookClub.speed}</p>
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
                                    <DateTimePicker className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                        placeholder="Event Date"
                                        value={formState.eventDate}
                                        onChange={handleDateChange}
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

            <div className='p-2'>
                <div>
                    <Collapsible className='p-2 text-2xl w-full bg-gray-300' trigger="Write a review ...">
                    <div className={` p-1 flex flex-col-reverse overflow-auto gap-3`}>
                        {bookClub.discussion.length && (
                            bookClub.discussion.map(message => <Message key={message._id} message={message} />)
                        ) || (
                                <div>
                                    <p className='text-center'>Start the discussion!</p>
                                </div>
                            )}
                    </div>
                    <div className='w-full align-text-middle'>
                        <form onSubmit={handleSubmitMessage}>
                            <textarea className="p-2 border rounded-sm bg-gray-10 w-5/6 align-middle text-sm"
                                onChange={handleChange}
                                name='body' />
                            <button className="p-3 w-1/6 btn bg-sky-600 hover:bg-sky-700 align-middle">Publish</button>
                        </form>
                    </div>
                    </Collapsible>
                </div>

            </div>
        </div>
    )
}