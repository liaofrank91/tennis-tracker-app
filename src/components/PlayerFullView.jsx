import { MdCancel } from "react-icons/md"
import playerImgs from "../image links/playerImgs"
import { AiOutlineDash } from "react-icons/ai"
import { RiArrowUpCircleFill, RiArrowDownCircleFill } from "react-icons/ri"
import { ImTrophy } from "react-icons/im"

function PlayerFullView({ player, resetEverything }) {
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    const d = new Date()
    let monthName = month[d.getMonth()]
    let year = d.getFullYear()

    return (
        <section className='flex flex-col items-center'>
            {/* FIRST SECTION */}
            <div key={player.full_name} style={{ minWidth: '50vw', height: '25vh' }} className='bg-base-300 rounded-xl mb-2 flex flex-row justify-between items-center'>
                <div className="avatar m-5" style={{minWidth: '10vw'}}>
                    <div className="w-32 rounded-xl">
                        <img src={playerImgs[player.id] ? playerImgs[player.id] : 'https://t4.ftcdn.net/jpg/03/31/38/97/360_F_331389703_cc98kdLkmBD7QeTA5NyhqnH3VLzudN75.jpg'} />
                    </div>
                </div>
                <div className="prose" style={{minWidth: '10vw'}}>
                    <h1 className='mb-0'>{player.last_name.toUpperCase()}, {player.first_name}</h1>
                </div>

                <div className='m-5 prose flex flex-col justify-center items-center' style={{minWidth: '10vw'}}>
                    <h1 className='mb-0'>{(player.ranking === 1) ? <ImTrophy /> : `#${player.ranking}`}</h1>
                    <h3 className='mt-2 flex flex-row justify-end items-center'>
                        {(player.ranking_movement === '') && <AiOutlineDash size={30} className='text-warning' />}{(player.ranking_movement.slice(0, 1) === '+') && <RiArrowUpCircleFill size={25} className='text-success' />}{(player.ranking_movement.slice(0, 1) === '-') && <RiArrowDownCircleFill size={25} className='text-error' />}{(player.ranking_movement !== '') && player.ranking_movement.slice(1)}
                    </h3>
                </div>
            </div>

            {/* SECOND SECTION */}
            <div className="stats stats-vertical lg:stats-horizontal shadow">

                <div className="stat">
                    <div className="stat-title">Points</div>
                    <div className="stat-value">{player.ranking_points}</div>
                    <div className="stat-desc">{monthName} {year - 1} - Now </div>
                </div>

                <div className="stat">
                    <div className="stat-title">Race Points</div>
                    <div className="stat-value">{player.race_points}</div>
                    <div className="stat-desc">January {year} - Now</div>
                </div>

                <div className="stat">
                    <div className="stat-title">Race Ranking</div>
                    <div className="stat-value"><h1 className='mb-0'>{(player.ranking === 1) ? <ImTrophy /> : `#${player.race_ranking}`}</h1></div>
                    <div className="stat-desc">By Race Points</div>
                </div>

            </div>

            <br></br>
            <button className='' onClick={resetEverything}>
                <MdCancel size={35} color='white' />
            </button>
        </section>
    )
}

export default PlayerFullView

//  country, first_name, full_name, last_name, id, ranking, ranking_points, ranking_movement