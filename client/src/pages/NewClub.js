import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useMutation } from '@apollo/client'
import { CREATE_ClUB } from '../utils/mutations'
import { useNavigate } from 'react-router-dom'

export default function NewClubForm() {
    const book = useSelector((state) => state.currentBook)
    const { bookId, title, authors, description, imgUrl } = book
    const [formState, setFormState] = useState({ clubName: '', speed: 'Slow', type: 'In person', meetingDay: 'Monday', meetingTime: '12 AM', maxMembers: undefined })
    const [createClub, { data, loading }] = useMutation(CREATE_ClUB)
    const navigate = useNavigate()

    useEffect(() => {
        if (data) {
            console.log(data)
            navigate(`/club/${data.createClub._id}`)
        }
    }, [data, loading])

    function maxMembersChange(e) {
        console.log(e.target.value)
        if (e.target.value === '') {
            document.getElementById('maxMembers').classList.add('!border-red-500')
            return
        } else {
            document.getElementById('maxMembers').classList.remove('!border-red-500')
            setFormState({ ...formState, maxMembers: parseInt(e.target.value)})
        }
    }

    function handleChange(e) {
        switch (e.target.name) {
            case 'clubName':
                setFormState({ ...formState, clubName: e.target.value })
                break
            case 'speed':
                setFormState({ ...formState, speed: e.target.value })
                break
            case 'type':
                setFormState({ ...formState, type: e.target.value })
                break
            case 'meetingDay':
                setFormState({ ...formState, meetingDay: e.target.value })
                break
            case 'meetingTime':
                console.log('here we are')
                setFormState({ ...formState, meetingTime: e.target.value })
                break
            default:
                return formState
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (!formState.clubName) {
            alert('You must provide a name for the club')
            return
        } else if (!formState.maxMembers) {
            alert('You must provide a number for the maximum total members')
            return
        }
        console.log(formState)
        createClub({
            variables: { ...formState, ...book }
        })
    }

    if (loading) {
        return (
            <div>
                Creating Club...
            </div>
        )
    }

    return (
        <div className="p-4">
            <form
                className="border-3 rounded-lg p-2 max-w-lg mx-auto border-purple-900 bg-white"
                onSubmit={handleSubmit}
            >
                <div className='py-2'>
                    <div className='flex flex-col mx-auto'>
                        <h2 className='text-center text-2xl'>{title}</h2>
                        <h3 className='text-center'> by {authors.join(', ')}</h3>
                    </div>
                </div>
                <div className='p-2'>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-4/6 mx-auto px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Club Name
                            </label>
                            <input className="p-2 outline-none text-sm bg-gray-100 text-gray-700 pr-2 rounded-full border-1 border-gray-300 w-full"
                                id="grid-first-name"
                                type="text"
                                placeholder="BookWormzzz"
                                onChange={handleChange}
                                name='clubName'
                            />
                        </div>

                    </div>
                    <div className="flex flex-wrap -mx-1 mb-2 flex justify-center">
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                                Speed
                            </label>
                            <div className="relative">
                                <select className="p-2 appearance-none outline-none text-sm bg-gray-100 text-gray-700 pr-2 rounded-full border-1 border-gray-300 w-full"
                                    id="grid-state"
                                    onChange={handleChange}
                                    name='speed'
                                >
                                    <option>Slow</option>
                                    <option>Medium</option>
                                    <option>Fast</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                                Type
                            </label>
                            <div className="relative">
                                <select className="p-2 appearance-none outline-none text-sm bg-gray-100 text-gray-700 pr-2 rounded-full border-1 border-gray-300 w-full"
                                    id="grid-state"
                                    onChange={handleChange}
                                    name='type'
                                >
                                    <option>In person</option>
                                    <option>Online</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-2 flex justify-center">
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                                Day
                            </label>
                            <div className="relative">
                                <select className="p-2 appearance-none outline-none text-sm bg-gray-100 text-gray-700 pr-2 rounded-full border-1 border-gray-300 w-full"
                                    id="grid-state"
                                    onChange={handleChange}
                                    name='meetingDay'
                                >
                                    <option>Monday</option>
                                    <option>Tuesday</option>
                                    <option>Wednesday</option>
                                    <option>Thursday</option>
                                    <option>Friday</option>
                                    <option>Saturday</option>
                                    <option>Sunday</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                                Time
                            </label>
                            <div className="relative">
                                <select className="p-2 appearance-none outline-none text-sm bg-gray-100 text-gray-700 pr-2 rounded-full border-1 border-gray-300 w-full"
                                    id="grid-state"
                                    onChange={handleChange}
                                    name='meetingTime'
                                >
                                    <option>12 AM</option>
                                    <option>1 AM</option>
                                    <option>2 AM</option>
                                    <option>3 AM</option>
                                    <option>4 AM</option>
                                    <option>5 AM</option>
                                    <option>6 AM</option>
                                    <option>7 AM</option>
                                    <option>8 AM</option>
                                    <option>9 AM</option>
                                    <option>10 AM</option>
                                    <option>11 AM</option>
                                    <option>12 PM</option>
                                    <option>1 PM</option>
                                    <option>2 PM</option>
                                    <option>3 PM</option>
                                    <option>4 PM</option>
                                    <option>5 PM</option>
                                    <option>6 PM</option>
                                    <option>7 PM</option>
                                    <option>8 PM</option>
                                    <option>9 PM</option>
                                    <option>10 PM</option>
                                    <option>11 PM</option>

                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-2 flex justify-center">

                        <div className="w-full md:w-1/3 pl-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="maxMembers">
                                Total Member Limit
                            </label>
                            <div className="relative">
                                <input className="p-2 appearance-none outline-none text-sm bg-gray-100 text-gray-700 pr-2 rounded-full border-1 border-gray-300 w-full"
                                    id="maxMembers"
                                    onBlur={maxMembersChange}
                                    type='number'
                                    name='maxMembers'
                                >
                                </input>
                            </div>
                        </div>
                    </div>

                    <div className='mt-8 flex justify-center'>
                        <button 
                                    className='p-3 text-base text-gray-50 bg-purple-900 border-purple-900 border-2 rounded-full'
                                    >
                            Create Club !
                        </button>
                    </div>
                </div>



            </form>
        </div>
    )
}