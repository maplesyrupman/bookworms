

export default function Logup() {
    return (
        <div>
            <div className="border border-2 rounded p-10 max-w-md mx-auto">
                <form onSubmit={handleSubmit} className='mx-auto'>
                    <div className="form-field">
                        <label htmlFor="email">Email</label>
                        <input type='email' name='email' defaultValue={email} onChange={handleChange} className="form-input" />
                    </div>
                    <div className="form-field">
                        <label htmlFor="username">Username</label>
                        <input type='text' name='username' defaultValue={username} onChange={handleChange} className="form-input" />
                    </div>
                    <div className="form-field">
                        <label htmlFor="password">Password</label>
                        <input type='password' name='password' defaultValue={password} onChange={handleChange} className="form-input" />
                    </div>
                    <div className="flex">
                        <button type='submit' className="mx-auto text-white font-bold py-2 px-4 rounded">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

