import { useState } from "react"
import { useMutation } from '@apollo/client'
import { SIGNUP_USER, LOGIN_USER } from '../utils/mutations'
import Auth from '../utils/auth'

export default function Logup() {
    const [formState, setFormState] = useState({ email: '', password: '', username: '' })
    const { email, password, username } = formState

    const [isSignup, setSignup] = useState(false)

    const [signup] = useMutation(SIGNUP_USER)
    const [login] = useMutation(LOGIN_USER)

    function toggleSignup() {
        setSignup(!isSignup)
    }

    function handleChange(e) {
        setFormState({ ...formState, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            if (isSignup) {
                const { data } = await signup({
                    variables: { ...formState }
                })
                Auth.login(data.signup.token)
            } else {
                const { email, password } = formState
                const { data } = await login({
                    variables: { email, password }
                })
                Auth.login(data.login.token)
            }
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="p-3">
            <div className="border-3 rounded-lg p-10 max-w-md mx-auto border-purple-900 bg-white">
                <form onSubmit={handleSubmit} className='mx-auto'>
                    <div className="form-field">
                        <label htmlFor="email">Email</label>
                        <input type='email' name='email' defaultValue={email} onChange={handleChange}
                        className="p-2 outline-none text-sm bg-gray-100 text-gray-700 pr-2 h-8 rounded-full border-1 border-gray-300"/>
                    </div>
                    {isSignup &&
                        <div className="form-field">
                            <label htmlFor="username">Username</label>
                            <input type='text' name='username' defaultValue={username} 
                            onChange={handleChange} 
                            className="p-2 outline-none text-sm bg-gray-100 text-gray-700 pr-2 h-8 rounded-full border-1 border-gray-300"/>
                            </div>
                    }
                    <div className="form-field">
                        <label htmlFor="password">Password</label>
                        <input type='password' name='password' defaultValue={password} onChange={handleChange} 
                        className="p-2 outline-none text-sm bg-gray-100 text-gray-700 pr-2 h-8 rounded-full border-1 border-gray-300"/>
                        </div>
                    <div className="flex flex-col">
                        <p className="p-2 text-center">
                            {isSignup ? 'Already have an account? ' : "Don't have an account yet? "}
                            <span className="underline hover:cursor-pointer hover:font-semibold" onClick={toggleSignup}>{isSignup ? 'login' : 'sign up'}</span>
                        </p>
                        <button type='submit' className="mx-auto py-2 px-4 text-gray-100 border-2 rounded-full bg-purple-900 border-purple-900">
                            {isSignup ? 'Sign Up' : 'Login'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

