import { useState } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { BsFillEyeFill } from "react-icons/bs"
import { FiArrowRightCircle } from "react-icons/fi"
import OAuth from '../components/OAuth'


function SignInPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const { email, password } = formData

    const navigate = useNavigate()

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            const auth = getAuth()

            const userCredential = await signInWithEmailAndPassword(auth, email, password)

            if (userCredential.user) {
                navigate('/')
            }
        } catch (error) {
            toast.error('Incorrect Username/Password')
        }


    }

    return (
        <div id='background-container' className="bg-[url('https://static01.nyt.com/images/2018/09/20/sports/20laverevent-inyt1/20laverevent-inyt1-superJumbo.jpg')] bg-no-repeat bg-center">
            <div className='flex flex-col justify-center items-center' style={{ minHeight: '100vh' }}>
                <div id='signInRectangle' className='prose bg-accent p-6 rounded-xl' style={{minWidth: '18vw'}}>
                    <h1 className='text-black mb-2'>Welcome Back!</h1>
                    <form onSubmit={onSubmit}>
                        <input type='email' placeholder='Email' className='emailInput input input-sm bg-white input-bordered w-full max-w-xs mb-1' id='email' value={email} onChange={onChange} />
                        <div id='passwordDiv' className='flex flex-row items-center bg-white rounded-md'>
                            <input type={showPassword ? 'text' : 'password'} placeholder="Password" className='input input-sm bg-white input-ghost w-full max-w-xs' id='password' value={password} onChange={onChange} />

                            <BsFillEyeFill className='m-1' alt='show password' style={{ color: 'black' }} onClick={() => setShowPassword((prevState) => !prevState)} />
                        </div>

                        <div id='signInBar' className='flex flex-row justify-center mt-2' style={{ color: 'black' }}>
                            <button className='btn btn-sm gap-2' type='submit'>
                                Sign In
                                <FiArrowRightCircle />
                            </button>
                        </div>

                        <div id='forgotpass-and-signup' className='flex flex-row justify-between align-center'>
                            <Link to='/forgot-password' style={{ textDecoration: 'none' }}>
                                <h4 className='mb-0 mt-2 text-warning'>Forgot Password?</h4>
                            </Link>
                            <OAuth />
                            <Link to='/sign-up' style={{ textDecoration: 'none', color: 'white' }}>
                                <h4 className='mb-0 mt-2 text-primary'>Sign Up Instead</h4>
                            </Link>
                        </div>


                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignInPage