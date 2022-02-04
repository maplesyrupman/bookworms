export default function Member({member}) {
    return (
        <div className="border-b-4 p-1">
            <p>{member.username}</p>
        </div>
    )
}