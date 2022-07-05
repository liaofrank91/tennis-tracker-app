import playerImgs from "../image links/playerImgs"
import { BsFillArrowRightCircleFill } from "react-icons/bs"

function PlayerPreview({ player, handlePlayerSelection }) {
    return (
        <div id={player.id} className='bg-base-300 flex flex-row justify-between items-center p-3 m-2 rounded-xl' style={{ width: '25vw' }}>
            <div className="avatar">
                <div className="w-20 rounded">
                    <img alt={player.full_name} src={playerImgs[player.id] ? playerImgs[player.id] : 'https://t4.ftcdn.net/jpg/03/31/38/97/360_F_331389703_cc98kdLkmBD7QeTA5NyhqnH3VLzudN75.jpg'} />
                </div>
            </div>
            <div className='prose'>
                <h3><b>{player.first_name.charAt(0)}. {player.last_name}</b></h3>
            </div>

            <button className='btn btn-sm' onClick={handlePlayerSelection}>
                <BsFillArrowRightCircleFill />
            </button>
        </div>


    )
}

export default PlayerPreview

