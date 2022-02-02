import { useState, useEffect } from 'react'
import { useQuery } from "@apollo/client"
import { QUERY_USER } from '../utils/queries'
import Auth from '../utils/auth'
import ClubTab from "../components/ClubTab"
// import { useParams } from 'react-router-dom'
// import BookTab from '../components/BookTab'
// import googleBook from '../utils/bookSearch'


export default function Profile() {
    const [images, setImages] = useState([])
    const [imageURLs, setImageURLs] = useState([])

    const { _id, username } = Auth.getProfile().data
    const { data, loading } = useQuery(QUERY_USER, { variables: { userId: _id } })

    // const [books, setBooks] = useState(undefined)
    // const { query } = useParams()


    // useEffect(async () => {
    //     setBooks(undefined)
    //     googleBook(query)
    //         .then(results => {
    //             setBooks(results)
    //         })
    // }, [query])

    useEffect(() => {
        if (images.length < 1) return;
        const newImageURLs = [];
        images.forEach(image => newImageURLs.push(URL.createObjectURL(image)));

        setImageURLs(newImageURLs);
    }, [images])

    function onImageChange(e) {
        setImages([...e.target.files]);
    }

    if (loading) {
        return (
            <div>
                Loading your profile...
            </div>
        )
    }

    return (
        <div >
            <div className="grid grid-cols-3" style={{ height: "300px", marginBottom: "30px", border: "2px solid black" }}>
                <div style={{
                    height: "300",
                    width: "300",
                    border: "2px dashed black"
                }}>
                    {imageURLs.map(imageSrc => <img src={imageSrc} alt="profile pics" className="photo" onProfile={true} />)}
                    <input type="file" multiple accept="image/*" onChange={onImageChange} />

                </div>

                <div >
                    <h2>Hello {username} ! </h2>
                    <h3>ABOUT ME</h3>
                </div>

                <div>
                    <h2>My Favourite Book</h2>

                </div>
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
                    UPCOMING MEETINGS
                </div>

            </div>
        </div>
    )
}