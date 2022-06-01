import { useState, useEffect } from 'react'

function TopTen() {

  const [topTenATP, setTopTenATP] = useState([])
  const [topTenWTA, setTopTenWTA] = useState([])

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

  useEffect(() => {
    getTopTenPlayers('ATP')
    getTopTenPlayers('WTA')
  }, [])


  return (
    <section className='flex flex-row justify-evenly bg-neutral-content p-6 m-5 rounded-xl'>
      <div className='flex flex-col prose justify-center items-center bg-base-300 rounded-md' style={{ minHeight: '15vh', minWidth: '40vw' }}>
        <h1 className='text-accent'>ATP Live Rankings</h1>
        {topTenATP.map((player) => (
          <div key={player.full_name}>{player.ranking}. {player.full_name}</div>
        ))}
      </div>
      <div className='flex flex-col prose justify-center items-center bg-base-300 rounded-md' style={{ minHeight: '15vh', minWidth: '40vw' }}>
        <h1 className='text-secondary'>WTA Live Rankings</h1>
        {topTenWTA.map((player) => (
          <div key={player.full_name}>{player.ranking}. {player.full_name}</div>
        ))}
      </div>

    </section>
  )
}

export default TopTen