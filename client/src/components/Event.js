export default function Event({ event }) {
    return (
        <div className='border-b-4 h-20 p-2 flex grid grid-cols-2'>
            <div>
                <p className="text-base font-bold leading-none align-text-bottom text-purple-900">{event.eventName}</p>
                <p className="text-xs author">{event.location}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(event.eventDate)}</p>
                <p className="text-xs author text-purple-900">Event Link: {event.link}</p>
            </div>
            <div className="flex justify-end gap-3">
                <a
                    href={event.link}
                    className='p-1 text-sm text-purple-900 bg-gray-50 border-purple-900 border-2 rounded-lg h-8 w-16='
                >
                    Join Meeting
                </a>
            </div>
        </div>
    )
}