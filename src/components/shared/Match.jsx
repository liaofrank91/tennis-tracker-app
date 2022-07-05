import { BsFillCheckCircleFill } from 'react-icons/bs'
import { GrMapLocation, GrLocationPin } from 'react-icons/gr'
import { BsCalendarEvent } from 'react-icons/bs'
import playerImgs from '../../image links/playerImgs'
import tournamentColors from '../../image links/tournamentColors'

function Match({ deleteFunction, identifier, playerOne, playerOneID, playerTwo, playerTwoID, roundName, tourney, court, year }) {

    return (
        <section style={{ width: '80vw' }} className='p-3'>
            <div className={`container p-8 bg-${tournamentColors[tourney] ? tournamentColors[tourney] : 'success'} rounded-xl`}>
                <div className="flex flex-row justify-between">

                    <div className="avatar">
                        <div className="w-24 rounded">
                            <img alt='player 1' src={playerImgs[playerOneID] ? playerImgs[playerOneID] : 'https://t4.ftcdn.net/jpg/03/31/38/97/360_F_331389703_cc98kdLkmBD7QeTA5NyhqnH3VLzudN75.jpg'} />
                        </div>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <h1 className='font-sans font-black text-black text-4xl'>{playerOne} vs {playerTwo}</h1>
                        <h1 className='font-sans font-black italic text-black text-2xl mb-3 flex flex-row'>
                            <GrMapLocation />&nbsp;{tourney} {year}&nbsp;&nbsp;&nbsp;<GrLocationPin />{court}&nbsp;&nbsp;&nbsp;&nbsp;<BsCalendarEvent />&nbsp;{roundName}
                        </h1>
                        <div className='flex flex-row'>
                            <button onClick={() => { deleteFunction(identifier) }}>
                                <BsFillCheckCircleFill size={25} />
                            </button>
                        </div>
                    </div>

                    <div className="avatar">
                        <div className="w-24 rounded">
                            <img alt='player 2' src={playerImgs[playerTwoID] ? playerImgs[playerTwoID] : 'https://t4.ftcdn.net/jpg/03/31/38/97/360_F_331389703_cc98kdLkmBD7QeTA5NyhqnH3VLzudN75.jpg'} />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Match