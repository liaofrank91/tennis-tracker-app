// import { GiMagnifyingGlass } from "react-icons/gi"
import { BiTennisBall } from "react-icons/bi"
import { BsFillArrowRightCircleFill } from "react-icons/bs"
import { TiDeleteOutline } from "react-icons/ti";
import { useState } from 'react'

function SearchPlayers() {

  const [searchState, setSearchState] = useState('')
  const [tourState, setTourState] = useState('ATP')
  const [resultsList, setResultsList] = useState([])
  const [displayState, setDisplayState] = useState({
    display: 'none', // display: 'none' is a little misleading: we are still displaying the search form!
    id: 0,
    player: {},
    triggerSearchForPlayer: false
  })

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
      setDisplayState({
        ...displayState,
        display: 'show-results'
      })
    }
  }

  const handlePlayerSelection = async (e) => {
    console.log(e.currentTarget.parentElement.id);
    setDisplayState(
      {
        // Don't change display from 'show-results' to 'show-player' yet!
        ...displayState,
        id: e.currentTarget.parentElement.id,
        player: {
        },
        triggerSearchForPlayer: true
      }
    )
  }

  const searchForPlayer = async () => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'tennis-live-data.p.rapidapi.com',
        'X-RapidAPI-Key': '60d1aa11c0mshcb929fd10cfe2b2p15ad44jsn3661ce95e454'
      }
    }

    console.log(displayState.id)
    const response = await fetch(`https://tennis-live-data.p.rapidapi.com/player/${displayState.id}`, options)
    let data = await response.json()
    console.log(data)
    // switches DISPLAY to 'show-player', sets PLAYER to the retrieved object, and switches OFF TRIGGERSEARCHFORPLAYER
    setDisplayState({
      ...displayState,
      display: 'show-player',
      player: data.results.player,
      triggerSearchForPlayer: false,
    })

  }

  const resetEverything = () => {
    // reset searchState, DON'T TOUCH tourState, resultsList, displayState
    setSearchState('')
    setResultsList([])
    setDisplayState({
      display: 'none',
      id: 0,
      player: {},
      triggerSearchForPlayer: false
    })
  }

  if (displayState.triggerSearchForPlayer) {
    searchForPlayer()
  }

  return (
    <div >
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

      {/* Search Results - only display if (displayState.display === 'show-results') */}
      {(displayState.display === 'show-results') && (
        <div id="search-results" className='flex flex-col items-center'>
          {resultsList.map((player) => (
            <div key={player.id} id={player.id} className='bg-primary flex flex-row'>
              <h3>{player.full_name}</h3>
              <button className='btn' onClick={handlePlayerSelection}>
                <BsFillArrowRightCircleFill />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Player Info - only display if (displayState.display === 'show-player') */}
      {(displayState.display === 'show-player') && (
        <div>
          <h1>hi</h1>
          <h2>{displayState.player.full_name}</h2>
          <button onClick={resetEverything}>
            <TiDeleteOutline />
          </button>
        </div>
      )}


    </div>
  )
}

export default SearchPlayers