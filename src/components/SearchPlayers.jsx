// import { GiMagnifyingGlass } from "react-icons/gi"
import { BiTennisBall } from "react-icons/bi"
import { useState } from 'react'

function SearchPlayers() {

  const [searchState, setSearchState] = useState('')
  const [tourState, setTourState] = useState('ATP')
  const [resultsList, setResultsList] = useState([])

  const handleSearch = async (e) => {
    e.preventDefault()
    if (searchState === '') {
      alert('you CANNOT BE SERIOUS')
    } else {
      const searchText = searchState.toLowerCase().trim()
      console.log(searchText)

      // Fetch all players from the selected TOUR
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Host': 'tennis-live-data.p.rapidapi.com',
          'X-RapidAPI-Key': '60d1aa11c0mshcb929fd10cfe2b2p15ad44jsn3661ce95e454'
        }
      }
      const response = await fetch(`https://tennis-live-data.p.rapidapi.com/players/${tourState}`, options)
      let data = await response.json()
      data = data.results.players
      data = data.filter((player) => (player.last_name.toLowerCase() === searchText))

      setResultsList(data)
      setSearchState('')
    }





  }

  return (
    <div className=''>
      {/* Search */}
      <div className='m-5'>
        <div className='flex flex-row justify-center items-center'>
          <form className="form-control w-full max-w-xs" onSubmit={handleSearch}>
            <div></div>
            <label className="label prose">
              <h2 className='mb-0'>Find a Player</h2>
            </label>
            <input onChange={(e) => setSearchState(e.target.value)} type="text" placeholder="Please enter a LAST NAME" className="input input-bordered input-success w-full max-w-xs" value={searchState} />
            <select className="mt-2 select select-info w-full max-w-xs" onChange={(e) => setTourState(e.target.value)}>
              <option>ATP</option>
              <option>WTA</option>
            </select>
            <button className="btn mt-2" type='submit'>
              <BiTennisBall size={20} />
            </button>
          </form>
        </div>
      </div>

      {/* Search Results */}
      <div id="search-results" className='prose'>
        {resultsList.map((player) => (
          <h3 key={player.id}>{player.full_name}</h3>
        ))}
      </div>

    </div>
  )
}

export default SearchPlayers