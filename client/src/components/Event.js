export default function Event({event}) {
    return (
        <div className="border p-1">
            <p>{event.eventName}</p>
            <p>@ {event.location} on {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(event.eventDate)}</p>
            <p>Event Link: {event.link}</p>
        </div>
    )
}