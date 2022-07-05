import { Link } from 'react-router-dom'
import Navbar from '../components/shared/Navbar'
import Watchlist from '../components/Watchlist'

function WatchlistPage() {
  return (
    <>
      <Navbar />
      <Watchlist />
    </>
  )
}

export default WatchlistPage