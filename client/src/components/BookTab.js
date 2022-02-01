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
        <div className="w-full bg-yellow-500 p-4 border-2 rounded-lg my-4">
            <div className="grid grid-cols-8">
                <div className="col-span-1">
                    <img src={imgUrl} />
                </div>

                <div className="col-span-5 w-full p-4">
                    <h2 className="text-4xl">{title}</h2>
                    <p className='text-lg author mb-1'>by {authors[0]}</p>

                    <p>{description}</p>
                </div>

                <div className="col-span-1 w-full px-8 pt-4">
                    {/* place holder */}
                </div>

                {isInSearch && (
                    <div className="col-span-1 w-full flex flex-col gap-2 justify-center align-center">
                        <div className="flex justify-center">
                            <button
                                className="btn btn-blue"
                                onClick={handleExplore}
                            >Expore</button>
                        </div>
                        <div className="flex justify-center">
                            {Auth.loggedIn() && (
                                <button
                                    className="btn btn-blue"
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