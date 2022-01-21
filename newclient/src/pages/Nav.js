import { Outlet, Link } from "react-router-dom";

export default function Nav() {
    return (
        <>
            <div className="p-4">
                <nav className='flex flex-row justify-between'>
                    <div className="text-5xl">BookWorms</div>
                    <ul className="flex flex-row">
                        <li className="nav-link">
                            <Link to='/'>Home</Link>
                        </li>
                        <li className='nav-link'>
                            <Link to='/logup'>Sign In</Link>
                        </li>
                    </ul>
                </nav>
            </div>

            <div>
                <Outlet />
            </div>
        </>
    )
}