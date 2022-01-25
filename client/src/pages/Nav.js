import { Outlet, Link, useNavigate,  } from "react-router-dom";
import { useState } from 'react'
import { BsSearch } from 'react-icons/bs'

import googleBook from '../utils/bookSearch'

export default function Nav() {
    const [searchState, setSearchState] = useState('')
    const navigate = useNavigate()


    function handleChange(e) {
        setSearchState(e.target.value)
    }

    function handleSearch(e) {
        e.preventDefault()
        navigate(`/books/${searchState}`)
    }
    return (
        <>
            <div className="p-4 bg-green-300">
                <nav className='columns-3'>
                    <div className="text-5xl w-full">
                        <Link to='/'>BookWorms</Link>
                    </div>

                    <form onSubmit={handleSearch}>
                        <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                            <input
                                className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                                type="text"
                                id="search"
                                placeholder="Search something.."
                                onChange={handleChange}
                                />

                            <div className="grid place-items-center h-full w-12 text-gray-300">
                                <button>
                                    <BsSearch />
                                </button>
                            </div>
                        </div>
                    </form>


                    <ul className="flex flex-row justify-end">
                        <li className='nav-link'>
                            <Link to='/logup'>Sign In</Link>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className="container mx-auto lg:px-24">
                <Outlet />
            </div>
        </>
    )
}