import { getAuth } from 'firebase/auth'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { GiTennisBall } from "react-icons/gi"

function InfoForm({ updateList }) {
    const auth = getAuth()

    const [oneState, setOneState] = useState('')
    const [twoState, setTwoState] = useState('')
    const [tourneyState, setTourneyState] = useState('Australian Open')
    const [yearState, setYearState] = useState(2022)
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
            'X-RapidAPI-Host': 'tennis-live-data.p.rapidapi.com'
        }
    }

    const resetStates = () => {
        setOneState('')
        setTwoState('')
        setTourneyState('Australian Open')
        setYearState(2022)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (oneState && twoState && tourneyState && yearState) {
            // STEP 1: VERIFYING THE MATCH EXISTS ---------------------------- 
            const userInput = {
                p1: oneState.toLowerCase().trim(),
                p2: twoState.toLowerCase().trim(),
                tourney: tourneyState,
                year: yearState,
            }

            // special case: if year is 2018 or below, the API does NOT support these matches yet
            if (userInput.year <= 2018) {
                toast.error("Unfortunately, the Tennis Live Data API does not support matches from 2018 and earlier")
                resetStates()
                return
            }

            toast.success('Looking for your match...')

            // get player 1 id (try both wta and atp)
            // get all atp players
            const atpResponse = await fetch('https://tennis-live-data.p.rapidapi.com/players/ATP', options)
            let atpData = await atpResponse.json()
            const atpList = atpData.results.players

            let playerFound = false
            let playerId = 0
            let tourCode = 0
            // check atp list for matching player
            for (let i = 0; i < atpList.length; i++) {
                if (atpList[i].full_name.toLowerCase().includes(userInput.p1)) {
                    playerFound = true
                    playerId = atpList[i].id
                    tourCode = 'ATP'
                    break
                }
            }
            // if search for player in ATP list is unsuccessful, check WTA
            if (!playerFound) {
                // get all wta players for matching player
                const wtaResponse = await fetch('https://tennis-live-data.p.rapidapi.com/players/WTA', options)
                let wtaData = await wtaResponse.json()
                const wtaList = wtaData.results.players
                // check wta list 
                for (let i = 0; i < wtaList.length; i++) {
                    if (wtaList[i].full_name.toLowerCase().includes(userInput.p1)) {
                        playerFound = true;
                        playerId = wtaList[i].id
                        tourCode = 'WTA'
                        break
                    }
                }
            }
            // if still haven't found the player... error msg
            if (!playerFound) {
                toast.error('At least one of your players does not exist!')
                resetStates()
                return
            }

            // search for the tournament's id - every edition of the same tournament has a diff id
            const tourneyResponse = await fetch(`https://tennis-live-data.p.rapidapi.com/tournaments/${tourCode}/${userInput.year}`, options)
            let tourneyData = await tourneyResponse.json()
            let tournamentList = tourneyData.results
            console.log(tournamentList)

            let tourneyFound = false
            let tourneyId = 0

            for (let i = 0; i < tournamentList.length; i++) {
                if (tournamentList[i].name.includes(userInput.tourney)) {
                    tourneyFound = true
                    tourneyId = tournamentList[i].id
                    break
                }
            }

            if (!tourneyFound) {
                toast.error('Tournament not found')
                resetStates()
                return
            }

            // get matches by tournament by player
            const matchesByTourneyByPlayerResponse = await fetch(`https://tennis-live-data.p.rapidapi.com/matches-results-by-player/${tourneyId}/${playerId}`, options)
            let matchesByTourneyByPlayerData = await matchesByTourneyByPlayerResponse.json()
            let matchesByTourneyByPlayerList = matchesByTourneyByPlayerData.results.matches
            console.log(matchesByTourneyByPlayerList)

            // use regex on each of the matches until one is found
            const regEx1 = new RegExp(userInput.p1 + '.*' + userInput.p2, 'i')
            const regEx2 = new RegExp(userInput.p2 + '.*' + userInput.p1, 'i')

            let matchFound = false
            let match = {}

            for (let i = 0; i < matchesByTourneyByPlayerList.length; i++) {
                if (regEx1.test(matchesByTourneyByPlayerList[i].title) || regEx2.test(matchesByTourneyByPlayerList[i].title)) {
                    matchFound = true
                    match = matchesByTourneyByPlayerList[i]
                } else {
                    console.log('hi');
                }
            }

            if (!matchFound) {
                toast.error('Match was not found!')
                resetStates()
                return
            }
            // if the match is found, we move on to the next step below


            // STEP 2: PREPARING THE MATCH ITEM TO BE UPDATED
            // generating unique key - using timestamp-----------------
            let currentDateTime = new Date()
            let resultInSeconds = currentDateTime.getTime() / 1000;
            // --------------------------------------------------------
            let newEntry = {
                p1: match.home_player,
                p1ID: match.home_id,
                p2: match.away_player,
                p2ID: match.away_id,
                roundName: match.round_name,
                tourney: userInput.tourney,
                court: match.court,
                year: userInput.year,
                unique: resultInSeconds,
                owner: auth.currentUser.uid
            }
            updateList(newEntry)
            resetStates()
        } else {
            toast.error('You must fill out all fields!')
        }

    }

    return (
        <div>
            <div className='bg-info-content flex flex-row justify-center items-center'>
                <GiTennisBall size={30} />
                <h1 className='font-sans font-black text-white text-5xl p-5'>Add a Match</h1>
                <GiTennisBall size={30} />
            </div>
            <form className='bg-base-content' onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 p-5">


                    <div className='flex flex-row justify-center items-center'>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-black"><b>Player 1</b></span>
                            </label>
                            <input onChange={(e) => setOneState(e.target.value)} type="text" placeholder="Please enter a Last Name" className="input input-bordered w-full max-w-xs" value={oneState} />
                        </div>
                    </div>

                    <div className='flex flex-row justify-center items-center'>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-black"><b>Player 2</b></span>
                            </label>
                            <input onChange={(e) => setTwoState(e.target.value)} type="text" placeholder="Please enter a Last Name" className="input input-bordered w-full max-w-xs" value={twoState} />
                        </div>
                    </div>

                    <div className='flex flex-row justify-center items-center'>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-black"><b>Tournament</b></span>
                            </label>
                            <select onChange={(e) => setTourneyState(e.target.value)} className="select select-bordered w-full max-w-xs" value={tourneyState} >
                                <option>Australian Open</option>
                                <option>Roland Garros</option>
                                <option>Wimbledon</option>
                                <option>US Open</option>
                                <option>BNP Paribas Open</option>
                                <option>Miami Open</option>
                                <option>Monte-Carlo Masters</option>
                                <option>Madrid Open</option>
                                <option>Internazionali BNL d'Italia</option>
                                <option>National Bank Open</option>
                                <option>Western & Southern Open</option>
                                <option>Shanghai Masters</option>
                                <option>Paris Masters</option>

                            </select>
                        </div>
                    </div>

                    <div className='flex flex-row justify-center items-center'>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-black"><b>Year</b></span>
                            </label>
                            <input onChange={(e) => setYearState(e.target.value)} type="number" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={yearState} />
                        </div>
                    </div>


                </div>
                <div className='flex flex-row justify-center p-6'>
                    <button type='submit' className='btn btn-info-content btn-md'>
                        Submit!
                    </button>
                </div>
            </form>
        </div>

    )
}

export default InfoForm