export default function Message({ message }) {
    return (
        <div className="border-2 rounded-lg">
            <div className='p-1'>
                <p className="text-sm">{message.user.username}</p>
            </div>
            <div className='p-3'>
                <p>
                    {message.body}
                </p>
            </div>
            <div className="p-1">
                <p className='text-right text-sm'>
                    {message.createdAt}
                </p>
            </div>
        </div>
    )
}