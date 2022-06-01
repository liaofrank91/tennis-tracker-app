import { Link } from 'react-router-dom'

function AboutPage() {
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
            <div className="tab tab-bordered">Watchlist</div>
          </Link>
          <Link to='/about'>
            <div className="tab tab-bordered tab-active">About</div>
          </Link>
        </div>
      </section>
      <div>About</div>
    </>
  )
}

export default AboutPage