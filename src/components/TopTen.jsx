import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { AiOutlineDash } from "react-icons/ai"
import { RiArrowUpCircleFill, RiArrowDownCircleFill } from "react-icons/ri"
import { ImTrophy } from "react-icons/im"
import playerImgs from '../image links/playerImgs'
import Spinner from './shared/Spinner'


function TopTen() {

  const [loading, setLoading] = useState(true)
  const [topTenATP, setTopTenATP] = useState([])
  const [topTenWTA, setTopTenWTA] = useState([])
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'tennis-live-data.p.rapidapi.com',
      'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
    }
  }

  const navigate = useNavigate()

  // Function that retrieves either ATP or WTA Top Ten, depending on what tour_code gets passed in 
  const getTopTenPlayers = async (tour_code) => {
    
    const response = await fetch(`https://tennis-live-data.p.rapidapi.com/rankings/${tour_code}`, options)
    let data = await response.json()
    data = data.results.rankings.filter(player => (player.ranking <= 20))
    console.log(data)
    if (tour_code === 'ATP') {
      setTopTenATP(data)
    } else {
      setTopTenWTA(data)
      setLoading(false)
    }
  }


  // Load the Top Ten 
  useEffect(() => {
    getTopTenPlayers('ATP')
    getTopTenPlayers('WTA')
    // eslint-disable-next-line
  }, [])

  if (loading) {
    return <Spinner />
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <section className='atp-wta-container flex flex-row justify-evenly bg-neutral-content p-6 m-5 rounded-xl'>
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
                      <img alt={player.full_name} src={playerImgs[player.id] ? playerImgs[player.id] : 'https://t4.ftcdn.net/jpg/03/31/38/97/360_F_331389703_cc98kdLkmBD7QeTA5NyhqnH3VLzudN75.jpg'} />
                    </div>
                  </div>
                  <div className='flex flex-col prose justify-center items-start'>
                    <h2 className='mb-0'>{player.last_name.toUpperCase()}, {player.first_name}</h2>
                    <h3 className='mt-0 italic'>{player.country}, {player.id}</h3>
                  </div>
                </div>
                {/* MIDDLE: num of points */}
                <div className=''>
                  {player.ranking_points} PTS
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
                      <img alt={player.full_name} src={playerImgs[player.id] ? playerImgs[player.id] : 'https://www.pngitem.com/pimgs/m/59-597883_tennis-silhouette-tennis-player-silhouette-png-transparent-png.png'} />
                    </div>
                  </div>
                  <div className='flex flex-col prose justify-center items-start'>
                    <h2 className='mb-0'>{player.last_name.toUpperCase()}, {player.first_name}</h2>
                    <h3 className='mt-0 italic'>{player.country}, {player.id}</h3>
                  </div>
                </div>
                {/* MIDDLE: num of points */}
                <div className=''>
                  {player.ranking_points} PTS
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
        </section>
        <div className='prose flex flex-row items-center' style={{margin: 'auto'}}>
            <h3>To locate a specific player, go to Search</h3>
            <button className="btn btn-outline btn-success m-2" type='button' onClick={() => navigate('/track')}>Search!</button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default TopTen