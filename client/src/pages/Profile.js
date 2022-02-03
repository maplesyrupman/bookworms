import React from 'react'
import { useState } from 'react'
import { useQuery } from "@apollo/client"
import { QUERY_USER } from '../utils/queries'
import Auth from '../utils/auth'
import ClubTab from "../components/ClubTab"
import ReactDom from "react-dom"


export default function Profile() {

    const uploadedImage = React.useRef(null);
    const imageUploader = React.useRef(null);

    const [status, setStatus] = useState(null)
    const [print, setPrint] = useState(false)

    const { _id, username } = Auth.getProfile().data
    const { data, loading } = useQuery(QUERY_USER, { variables: { userId: _id } })



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
                <div
                    style={{
                        height: "200px",
                        width: "200px",
                        border: "1px dashed black",


                    }}
                    onClick={() => imageUploader.current.click()}
                >
                    <img
                        ref={uploadedImage}
                        style={{
                            width: "200px",
                            height: "200px",
                            position: "absolute"
                        }}
                        alt="profile pic"
                    />
                    <input type="file" accept="image/*" onChange={handleImageUpload} ref={imageUploader} style={{ display: "none" }} />
                    Click to upload Image
                </div>

                <div>

                    <h2>Hello {username} ! </h2>
                    <div style={{ marginTop: "30px" }}>{print ? <p style={{ fontFamily: "cursive" }}>{status}</p> : null}</div>
                    <div style={{ marginTop: "100px" }}>
                        <lable>Would you like to share your Thought of the Day!</lable>
                        <input id="statusBox" style={{ width: "250px", border: "2px solid black", borderRadius: "5px" }} type="text" defaultValue={status} onChange={getStatus} />

                    </div>
                    <button onClick={submitStatus}>Submit</button>
                </div>

                <div>
                    <h2>My Favourite Book</h2>

                </div>
            </div>


            <div style={{ marginTop: "50px", height: "300px", border: "2px solid black" }}>
                <h2 className="">Popular Books</h2>

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
        </div >
    )
}