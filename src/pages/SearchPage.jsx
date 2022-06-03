import { Link } from 'react-router-dom'
import SearchPlayers from '../components/SearchPlayers'

function SearchPage() {
  return (
    <div>
      <section className='flex flex-row justify-center items-center'>
        <div className="tabs">
          <Link to='/'>
            <div className="tab tab-bordered">Watchlist</div>
          </Link>
          <Link to='/track'>
            <div className="tab tab-bordered tab-active">Search Player</div>
          </Link>
          <Link to='/rankings'>
            <div className="tab tab-bordered">Rankings</div>
          </Link>
          <Link to='/about'>
            <div className="tab tab-bordered">About</div>
          </Link>
        </div>
      </section>

      <SearchPlayers />
    </div>
  )
}

export default SearchPage