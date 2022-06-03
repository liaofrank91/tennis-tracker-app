import { BsFillCheckCircleFill } from 'react-icons/bs'

function Match({ deleteFunction, identifier, playerOne, playerTwo, tourney, year }) {

    return (
        <section style={{ width: '80vw' }} className='p-3'>
            <div className="container p-8 bg-accent rounded-xl">
                <div className="flex flex-row justify-between">

                    <div className="avatar">
                        <div className="w-20 rounded">
                            <img src="https://www.si.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTg4MTA3MTAyNzY0NDEwNzcz/novak-djokovic-3.jpg" />
                        </div>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <h1 className='font-sans font-black text-black text-4xl'>{playerOne} vs {playerTwo}</h1>
                        <h1 className='font-sans font-black italic text-black text-2xl mb-3'>{tourney} {year}</h1>
                        <div className='flex flex-row'>
                            <button onClick={() => { deleteFunction(identifier) }}>
                                <BsFillCheckCircleFill size={25} />
                            </button>
                        </div>
                    </div>

                    <div className="avatar">
                        <div className="w-20 rounded">
                            <img src="https://static01.nyt.com/images/2021/11/17/multimedia/17tennis-federer2/17tennis-federer2-mediumSquareAt3X.jpg" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Match