import { Outlet, Link, useNavigate, } from "react-router-dom";
import { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import Auth from '../utils/auth'

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

    function logout() {
        Auth.logout()
        window.location.replace('/')
    }
    return (
        <>
            <div className="p-2 bg-purple-900">
                <nav className='columns-3'>
                    <div className="p-2 text-4xl w-full text-slate-300">
                        <Link to='/'>BookWorms</Link>
                    </div>

                    <form onSubmit={handleSearch}>
                        <div className="p-2 relative flex items-center w-full h-10 rounded-full bg-gray-100 overflow-hidden">
                            <input
                                className="peer h-full w-full outline-none text-sm bg-gray-100 text-gray-700 pr-2"
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
                        {!Auth.loggedIn() && (
                            <li className='nav-link hover:cursor-pointer text-base text-gray-100 border-2 rounded-full'>
                                <Link to='/logup'>Sign In</Link>
                            </li>
                        )}
                        {Auth.loggedIn() && (
                            <>
                                <li
                                    className="nav-link hover:cursor-pointer text-base text-gray-100 border-2 rounded-full"
                                    onClick={logout}
                                >
                                    <p>Logout</p>
                                </li>
                                <li
                                    className="nav-link hover:cursor-pointer text-base text-gray-100 border-2 rounded-full"
                                >
                                    <Link to='/profile'>Profile</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>

            <div className="container mx-auto lg:px-24">
                <Outlet />
            </div>
        </>
    )
}