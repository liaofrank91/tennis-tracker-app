import { Link } from 'react-router-dom'
import Navbar from '../components/shared/Navbar'
import SearchPlayers from '../components/SearchPlayers'

function SearchPage() {
  return (
    <div>
      <Navbar />
      <SearchPlayers />
    </div>
  )
}

export default SearchPage