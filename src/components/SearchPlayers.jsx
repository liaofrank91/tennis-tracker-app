// import { GiMagnifyingGlass } from "react-icons/gi"
import PlayerPreview from "./PlayerPreview"
import { BiTennisBall } from "react-icons/bi"
import { useState } from 'react'
import { toast } from 'react-toastify'
import { MdCancel } from "react-icons/md"
import { GiTennisRacket } from "react-icons/gi"
import Spinner from "./shared/Spinner"
import PlayerFullView from "./PlayerFullView"

function SearchPlayers() {

  const [loading, setLoading] = useState(false)
  const [searchState, setSearchState] = useState('')
  const [tourState, setTourState] = useState('ATP')
  const [resultsList, setResultsList] = useState([])
  const [displayState, setDisplayState] = useState({
    display: 'none', // display: 'none' is a little misleading: we are still displaying the search form!
    id: 0,
    player: {},
    triggerSearchForPlayer: false
  })
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'tennis-live-data.p.rapidapi.com',
      'X-RapidAPI-Key': process.env.REACT_APP_API_KEY
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    if (searchState === '') {
      toast.error('you CANNOT BE SERIOUS')
    } else {
      setLoading(true)
      const searchText = searchState.toLowerCase().trim()
      console.log(searchText)

      try {
        // Fetch all players from the selected TOUR, then filter 
        const response = await fetch(`https://tennis-live-data.p.rapidapi.com/players/${tourState}`, options)
        let data = await response.json()
        data = data.results.players
        data = data.filter((player) => (player.last_name.toLowerCase() === searchText))
        console.log(data)

        setLoading(false)
        setResultsList(data)
        setSearchState('')
        setDisplayState({
          ...displayState,
          display: 'show-results'
        })

        if (data.length === 0) {
          toast.error("No results found :(")
          console.log(searchText)
          resetEverything()
        }

      } catch (error) {
        setLoading(false)
        resetEverything()
        toast.error("Something went wrong...")
      }



    }
  }

  const handlePlayerSelection = async (e) => {
    setLoading(true)
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
    try {
      const response = await fetch(`https://tennis-live-data.p.rapidapi.com/player/${displayState.id}`, options)
      let data = await response.json()
      console.log(data)
      // switches DISPLAY to 'show-player', sets PLAYER to the retrieved object, and switches OFF TRIGGERSEARCHFORPLAYER
      setLoading(false)
      setDisplayState({
        ...displayState,
        display: 'show-player',
        player: data.results.player,
        triggerSearchForPlayer: false,
      })
      toast.success("Player found!")
      console.log(data.results.player)
    } catch (error) {
      toast.error("Something went wrong...")
      console.log(displayState.id)
    }

  }

  const resetEverything = () => {
    toast.success("Cleared")
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
      {loading && <Spinner />}
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
            <PlayerPreview key={player.full_name} player={player} handlePlayerSelection={handlePlayerSelection}/>
          ))}
          <button onClick={resetEverything}>
            <MdCancel />
          </button>
        </div>
      )}

      {/* Player Info - only display if (displayState.display === 'show-player') */}
      {(displayState.display === 'show-player') && (
        <PlayerFullView player={displayState.player} resetEverything={resetEverything}/>
      )}

      {displayState.display === 'none' && <div className='flex flex-col justify-center items-center'><GiTennisRacket size={450} /></div>}

    </div>
  )
}

export default SearchPlayers