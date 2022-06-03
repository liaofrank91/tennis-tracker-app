import { Link } from 'react-router-dom'
import TopTen from '../components/TopTen'

function RankingsPage() {
  return (
    <>
      <section className='flex flex-row justify-center items-center'>
        <div className="tabs">
          <Link to='/'>
            <div className="tab tab-bordered">Watchlist</div>
          </Link>
          <Link to='/track'>
            <div className="tab tab-bordered">Search Player</div>
          </Link>
          <Link to='/rankings'>
            <div className="tab tab-bordered tab-active">Rankings</div>
          </Link>
          <Link to='/about'>
            <div className="tab tab-bordered">About</div>
          </Link>
        </div>
      </section>

      <TopTen />
    </>
  )
}

export default RankingsPage