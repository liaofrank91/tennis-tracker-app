import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

function Navbar() {
    
    const location = useLocation()

    return (
        <section className='flex flex-row justify-center items-center'>
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
        </section>
    )
}

export default Navbar