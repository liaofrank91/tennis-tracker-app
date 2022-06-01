import { Link } from 'react-router-dom'
import TopTen from '../components/TopTen'
import TrackedPlayers from '../components/TrackedPlayers'

function HomePage() {
  return (
    <>
      <section className='flex flex-row justify-center items-center'>
        <div className="tabs">
          <Link to='/'>
            <div className="tab tab-bordered tab-active">Home</div>
          </Link>
          <Link to='/track'>
            <div className="tab tab-bordered">Track A Player</div>
          </Link>
          <Link to='/watchlist'>
            <div className="tab tab-bordered">Watchlist</div>
          </Link>
          <Link to='/about'>
            <div className="tab tab-bordered">About</div>
          </Link>
        </div>
      </section>

      <TopTen />
      <TrackedPlayers />
    </>
  )
}

export default HomePage