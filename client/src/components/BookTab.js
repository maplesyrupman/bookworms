import { useDispatch } from "react-redux"
import { setCurrentBook } from "../redux/actions"
import { useNavigate } from "react-router-dom"
import Auth from '../utils/auth'

export default function BookTab({ book, isInSearch }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { bookId, title, authors, description, imgUrl } = book

    function handleCreate() {
        dispatch(setCurrentBook({ ...book }))
        navigate('/clubs/newClub')
    }

    function handleExplore() {
        dispatch(setCurrentBook({ ...book }))
        navigate(`/clubs/${book.bookId}`)
    }


    return (
        <div className="w-full border-b-4 bg-white p-2">
            <div className="grid grid-cols-8">
                <div className="col-span-1">
                    <img className="h-26" src={imgUrl} />
                </div>

                <div className="col-span-5 w-full p-4">
                    <h2 className="text-xl font-bold leading-none align-text-bottom text-purple-900">{title}</h2>
                    <p className='text-base author mb-1'>by {authors[0]}</p>

                    <p className="text-base truncate">{description}</p>
                </div>

                <div className="col-span-1 w-full px-8 pt-4">
                    {/* place holder */}
                </div>

                {isInSearch && (
                    <div className="col-span-1 w-full flex flex-col gap-2 justify-center align-center">
                        <div className="flex justify-center">
                            <button
                                onClick={handleExplore}
                                className='p-1 text-sm text-purple-900 bg-gray-50 border-purple-900 border-2 rounded-lg h-8 w-16'

                            >Expore</button>
                        </div>
                        <div className="flex justify-center">
                            {Auth.loggedIn() && (
                                <button
                                    className='p-1 text-sm text-purple-900 bg-gray-50 border-purple-900 border-2 rounded-lg h-8 w-16'
                                    onClick={handleCreate}
                                >
                                    Create
                                </button>
                            )}
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}