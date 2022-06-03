import { useState, useEffect } from 'react'
import { FaArrowUp } from 'react-icons/fa'
import { AiOutlineDash } from "react-icons/ai"
import { RiArrowUpCircleFill, RiArrowDownCircleFill } from "react-icons/ri"
import { ImTrophy } from "react-icons/im";



function TopTen() {

  const [topTenATP, setTopTenATP] = useState([{ "country": "Serbia", "first_name": "Novak", "full_name": "Novak Djokovic", "id": 89304, "last_name": "Djokovic", "movement": "", "ranking": 1, "ranking_points": 10220 }, { "country": "Spain", "first_name": "Rafael", "full_name": "Rafael Nadal", "id": 86928, "last_name": "Nadal", "movement": "-10", "ranking": 2, "ranking_points": 9850 }])
  const [topTenWTA, setTopTenWTA] = useState([{ "country": "Poland", "first_name": "Iga", "full_name": "Iga Swiatek", "id": 23892, "last_name": "Swiatek", "movement": "-1", "ranking": 1, "ranking_points": 10220 }, { "country": "Spain", "first_name": "Rafael", "full_name": "Rafael Nadal", "id": 86928, "last_name": "Nadal", "movement": "", "ranking": 2, "ranking_points": 9850 }])

  // Function that retrieves either ATP or WTA Top Ten, depending on what tour_code gets passed in 
  const getTopTenPlayers = async (tour_code) => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'tennis-live-data.p.rapidapi.com',
        'X-RapidAPI-Key': '60d1aa11c0mshcb929fd10cfe2b2p15ad44jsn3661ce95e454'
      }
    };

    const response = await fetch(`https://tennis-live-data.p.rapidapi.com/rankings/${tour_code}`, options)
    let data = await response.json()
    data = data.results.rankings.filter(player => (player.ranking <= 10))
    console.log(data)
    if (tour_code === 'ATP') {
      setTopTenATP(data)
    } else {
      setTopTenWTA(data)
    }
  }


  // Load the Top Ten 
  useEffect(() => {
    getTopTenPlayers('ATP')
    getTopTenPlayers('WTA')
  }, [])

  return (
    <section className='flex flex-row justify-evenly bg-neutral-content p-6 m-5 rounded-xl'>
      <div id='atp' className='flex flex-col'>
        <div id='atp-header' className='flex flex-col prose justify-center items-center bg-base-300 rounded-md mb-3' style={{ minHeight: '15vh', minWidth: '40vw' }}>
          <h1 className='text-accent'>ATP Live Rankings</h1>
        </div>
        {/* Player list */}
        {topTenATP.map((player) => (
          <div key={player.full_name} className='flex flex-row justify-between items-center bg-base-300 rounded-md mb-2'>
            {/* LEFT SIDE: avatar || full name, country*/}
            <div className='flex flex-row'>
              <div className="avatar m-5">
                <div className="w-20 rounded-xl">
                  <img src="https://sportshub.cbsistatic.com/i/r/2022/05/25/904f8ca2-31f0-49a7-99b9-0e469f8bf95b/thumbnail/640x360/25250ebae2d6d1390f1b43288601c03f/djokovic-getty.jpg" />
                </div>
              </div>
              <div className='flex flex-col prose justify-center items-start'>
                <h2 className='mb-0'>{player.last_name.toUpperCase()}, {player.first_name}</h2>
                <h3 className='mt-0 italic'>{player.country}</h3>
              </div>
            </div>
            {/* RIGHT SIDE: current rank, rank movement, current points */}
            <div className='m-5 prose flex flex-col justify-center items-center'>
              <h1 className='mb-0'>{(player.ranking === 1) ? <ImTrophy /> : `#${player.ranking}`}</h1>
              <h3 className='mt-2 flex flex-row justify-end items-center'>
                {(player.movement === '') && <AiOutlineDash size={30} className='text-warning' />}{(player.movement.slice(0, 1) === '+') && <RiArrowUpCircleFill size={25} className='text-success' />}{(player.movement.slice(0, 1) === '-') && <RiArrowDownCircleFill size={25} className='text-error' />}{(player.movement !== '') && player.movement.slice(1)}
              </h3>
            </div>

          </div>
        ))}
      </div>
      
      <div id='wta' className='flex flex-col'>
        <div id='wta-header' className='flex flex-col prose justify-center items-center bg-base-300 rounded-md mb-3' style={{ minHeight: '15vh', minWidth: '40vw' }}>
          <h1 className='text-secondary'>WTA Live Rankings</h1>
        </div>
        {/* Player list */}
        {topTenWTA.map((player) => (
          <div key={player.full_name} className='flex flex-row justify-between items-center bg-base-300 rounded-md mb-2'>
            {/* LEFT SIDE: avatar || full name, country*/}
            <div className='flex flex-row'>
              <div className="avatar m-5">
                <div className="w-20 rounded-xl">
                  <img src="https://sportshub.cbsistatic.com/i/r/2022/05/25/904f8ca2-31f0-49a7-99b9-0e469f8bf95b/thumbnail/640x360/25250ebae2d6d1390f1b43288601c03f/djokovic-getty.jpg" />
                </div>
              </div>
              <div className='flex flex-col prose justify-center items-start'>
                <h2 className='mb-0'>{player.last_name.toUpperCase()}, {player.first_name}</h2>
                <h3 className='mt-0 italic'>{player.country}</h3>
              </div>
            </div>
            {/* MIDDLE: num of points */}
            <div className=''>
              {player.ranking_points}
            </div>
            {/* RIGHT SIDE: current rank, rank movement, current points */}
            <div className='m-5 prose flex flex-col justify-center items-center'>
              <h1 className='mb-0'>{(player.ranking === 1) ? <ImTrophy /> : `#${player.ranking}`}</h1>
              <h3 className='mt-2 flex flex-row justify-end items-center'>
                {(player.movement === '') && <AiOutlineDash size={30} className='text-warning' />}{(player.movement.slice(0, 1) === '+') && <RiArrowUpCircleFill size={25} className='text-success' />}{(player.movement.slice(0, 1) === '-') && <RiArrowDownCircleFill size={25} className='text-error' />}{(player.movement !== '') && player.movement.slice(1)}
              </h3>
            </div>

          </div>
        ))}
      </div>


      {/* <div id='atp' className='flex flex-col'>
        <div id='atp-header' className='flex flex-col prose justify-center items-center bg-base-300 rounded-md' style={{ minHeight: '15vh', minWidth: '40vw' }}>
          <h1 className='text-secondary'>WTA Live Rankings</h1>
        </div>
        <div className='flex flex-col justify-center items-center bg-base-300 rounded-md mt-4' id='atp-body'>
          {topTenWTA.map((player) => (
            <div key={player.full_name}>{player.ranking}. {player.full_name}</div>
          ))}
        </div>
      </div> */}

    </section>
  )
}

export default TopTen