import { FaUserCircle } from 'react-icons/fa'

export default function Message({ message }) {
    return (
        <div className="border-2 rounded-lg bg-gray-50">
            <div className="p-1">
                <table>
                    <tbody>
                        <tr>
                            <td><p className="text-4xl font-bold p-2 text-gray-300"><FaUserCircle /></p></td>
                            <td><p className="text-sm font-bold">{message.user.username}</p>
                                <p className="text-xs italic text-gray-4    00">
                                    {message.createdAt}
                                </p></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='p-3'>
                <p className="text-sm">
                    {message.body}
                </p>
            </div>
        </div>
    )
}