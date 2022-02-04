import { FaUserCircle } from 'react-icons/fa'

export default function Message({ message }) {
    return (
        <div className="rounded-lg bg-gray-200 text-gray-900">
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td><p className="text-4xl font-bold p-2 text-gray-300"><FaUserCircle /></p></td>
                            <td><p className="text-sm font-bold">{message.user.username}</p>
                                <p className="text-xs italic text-gray-4">
                                    {message.createdAt}
                                </p></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='p-2'>
                <p className="text-sm">
                    {message.body}
                </p>
            </div>
        </div>
    )
}