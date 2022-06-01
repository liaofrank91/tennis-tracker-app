import { Link } from 'react-router-dom'
import Watchlist from '../components/Watchlist'

function WatchlistPage() {
  return (
    <>
      <section className='flex flex-row justify-center items-center'>
        <div className="tabs">
          <Link to='/'>
            <div className="tab tab-bordered">Home</div>
          </Link>
          <Link to='/track'>
            <div className="tab tab-bordered">Track A Player</div>
          </Link>
          <Link to='/watchlist'>
            <div className="tab tab-bordered tab-active">Watchlist</div>
          </Link>
          <Link to='/about'>
            <div className="tab tab-bordered">About</div>
          </Link>
        </div>
      </section>

      <Watchlist />
    </>
  )
}

export default WatchlistPage