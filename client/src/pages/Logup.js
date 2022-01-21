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
        <div>
            <div className="border border-2 rounded p-10 max-w-md mx-auto">
                <form onSubmit={handleSubmit} className='mx-auto'>
                    <div className="form-field">
                        <label htmlFor="email">Email</label>
                        <input type='email' name='email' defaultValue={email} onChange={handleChange} className="form-input" />
                    </div>
                    {isSignup &&
                        <div className="form-field">
                            <label htmlFor="username">Username</label>
                            <input type='text' name='username' defaultValue={username} onChange={handleChange} className="form-input" />
                        </div>
                    }
                    <div className="form-field">
                        <label htmlFor="password">Password</label>
                        <input type='password' name='password' defaultValue={password} onChange={handleChange} className="form-input" />
                    </div>
                    <div className="flex flex-col">
                        <p className="text-center">
                            {isSignup ? 'Already have an account? ' : "Don't have an account yet? "}
                            <span className="underline hover:cursor-pointer hover:font-semibold" onClick={toggleSignup}>{isSignup ? 'login' : 'sign up'}</span>
                        </p>
                        <button type='submit' className="mx-auto text-white font-bold py-2 px-4 rounded">
                            {isSignup ? 'Sign Up' : 'Login'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

