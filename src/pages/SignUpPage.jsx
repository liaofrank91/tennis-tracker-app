import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import OAuth from '../components/OAuth'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import { BsFillEyeFill } from "react-icons/bs"
import { FiArrowRightCircle } from "react-icons/fi"

function SignUpPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })
    const { name, email, password } = formData

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

            const userCredential = await createUserWithEmailAndPassword(auth, email, password)

            const user = userCredential.user
            updateProfile(auth.currentUser, {
                displayName: name
            })

            const formDataCopy = { ...formData }
            delete formDataCopy.password
            formDataCopy.timestamp = serverTimestamp()

            await setDoc(doc(db, 'users', user.uid), formDataCopy)

            navigate('/')

        } catch (error) {
            toast.error('Something went wrong :(');
        }
    }

    return (
        <div id='background-container' className="bg-[url('https://mobimg.b-cdn.net/v3/fetch/4f/4fefa3ecf018ce143d2d9e6fb318b469.jpeg')] bg-no-repeat bg-center bg-auto" >
            <div className='flex flex-col justify-center items-center' style={{ minHeight: '100vh' }}>
                <div id='signInRectangle' className='prose bg-success p-6 rounded-xl'>
                    <h1 className='text-black mb-2'>Join us! </h1>

                    <form onSubmit={onSubmit} className='w-full max-w-xs'>
                        <input type='text' placeholder='Name' className='emailInput input input-sm bg-white input-bordered w-full max-w-xs mb-1' id='name' value={name} onChange={onChange} />
                        <input type='email' placeholder='Email' className='emailInput input input-sm bg-white input-bordered w-full max-w-xs mb-1' id='email' value={email} onChange={onChange} />
                        <div id='passwordDiv' className='flex flex-row items-center bg-white rounded-md w-full max-w-xs mb-1'>
                            <input type={showPassword ? 'text' : 'password'} placeholder="Password" className='input input-sm bg-white input-ghost w-full max-w-xs' id='password' value={password} onChange={onChange} />

                            <BsFillEyeFill className='m-1' alt='show password' style={{ color: 'black' }} onClick={() => setShowPassword((prevState) => !prevState)} />
                        </div>

                        <div id='signUpBar' className='flex flex-row justify-center mt-2' style={{ color: 'black' }}>
                            <button type='submit' className='btn btn-sm gap-2'>
                                Sign Up
                                <FiArrowRightCircle />
                            </button>
                        </div>

                        <div id='forgotpass-googleoauth-signup' className='flex flex-row justify-between align-center'>
                            <Link to='/forgot-password' style={{ textDecoration: 'none' }}>
                                <h4 className='mb-0 mt-2 text-warning'>Forgot Password?</h4>
                            </Link>
                            <OAuth />
                            <Link to='/sign-in' style={{ textDecoration: 'none', color: 'white' }}>
                                <h4 className='mb-0 mt-2 text-primary'>Sign In Instead</h4>
                            </Link>
                        </div>



                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage