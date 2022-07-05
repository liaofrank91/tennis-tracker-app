import { useState } from 'react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { FiArrowRightCircle } from "react-icons/fi"


function ForgotPasswordPage() {
    const [email, setEmail] = useState('')

    const onChange = (e) => {
        setEmail(e.target.value)
    }


    const onSubmit = async (e) => {
        e.preventDefault()
        
        try {
            const auth = getAuth()
            await sendPasswordResetEmail(auth, email)
            console.log(email)
            toast.success('Email was sent')
            setEmail('')
        } catch (error) {
            toast.error('Could not send reset email')
        }

    }

    return (
        <div id='background-container' className="bg-[url('https://cdn.territories.bnpparibas/app/uploads/sites/8/2021/05/166257070.jpg')] bg-no-repeat bg-center">
            <div className='flex flex-col justify-center items-center' style={{ minHeight: '100vh' }}>
                <div id='signInRectangle' className='prose bg-error p-6 rounded-xl'>
                    <h2 className='text-black mb-2'>Reset Password!</h2>
                    <form onSubmit={onSubmit}>
                        <input type='email' placeholder='Email' className='emailInput input input-sm bg-white input-bordered w-full max-w-xs mb-1' id='email' value={email} onChange={onChange} />

                        <div id='signInBar' className='flex flex-row justify-center mt-2' style={{ color: 'black' }}>
                            <button className='btn btn-sm gap-2' type='submit'>
                                Send Reset Link
                                <FiArrowRightCircle />
                            </button>
                        </div>

                        <div id='forgotpass-and-signup' className='flex flex-row justify-center align-center'>
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

export default ForgotPasswordPage