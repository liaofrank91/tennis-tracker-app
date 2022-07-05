import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

function Navbar() {
    const auth = getAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const onLogout = () => {
        auth.signOut()
        navigate('/sign-in')
    }

    return (
        <section className='navbar-container flex flex-row justify-between items-center mt-2'>
            <div style={{ minWidth: '15vw' }} className='flex flex-row justify-start'>
                <div className="logged-in-badge badge badge-warning badge-md m-2 ml-5">Logged in as&nbsp;<b>{auth.currentUser.displayName}</b></div>
            </div>
            <div className="tabs">
                <Link to='/'>
                    <div className={`tab tab-bordered ${location.pathname === '/' && "tab-active"}`}>Watchlist</div>
                </Link>
                <Link to='/track'>
                    <div className={`tab tab-bordered ${location.pathname === '/track' && "tab-active"}`}>Search Player</div>
                </Link>
                <Link to='/rankings'>
                    <div className={`tab tab-bordered ${location.pathname === '/rankings' && "tab-active"}`}>Rankings</div>
                </Link>
                <Link to='/about'>
                    <div className={`tab tab-bordered ${location.pathname === '/about' && "tab-active"}`}>About</div>
                </Link>
            </div>
            <div style={{ minWidth: '15vw' }} className='flex flex-row justify-end'>
                <button className="btn btn-error btn-sm m-2 mr-5" type='button' onClick={onLogout}>Logout</button>
            </div>
        </section>
    )
}

export default Navbar