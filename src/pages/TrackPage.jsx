import { Link } from 'react-router-dom'

function TrackPage() {
  return (
    <>
      <section className='flex flex-row justify-center items-center'>
        <div className="tabs">
          <Link to='/'>
            <div className="tab tab-bordered">Home</div>
          </Link>
          <Link to='/track'>
            <div className="tab tab-bordered tab-active">Track A Player</div>
          </Link>
          <Link to='/watchlist'>
            <div className="tab tab-bordered">Watchlist</div>
          </Link>
          <Link to='/about'>
            <div className="tab tab-bordered">About</div>
          </Link>
        </div>
      </section>

      <div>TrackPage</div>
    </>
  )
}

export default TrackPage