import { useState } from 'react'

function InfoForm({ updateList }) {

    const [oneState, setOneState] = useState('')
    const [twoState, setTwoState] = useState('')
    const [tourneyState, setTourneyState] = useState('')
    const [yearState, setYearState] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (oneState && twoState && tourneyState && yearState) {
            // generating unique key - using timestamp-----------------
            let currentDateTime = new Date()
            let resultInSeconds = currentDateTime.getTime() / 1000;
            // --------------------------------------------------------
            let newEntry = {
                p1: oneState.trim(),
                p2: twoState.trim(),
                tourney: tourneyState.trim(),
                year: yearState.trim(),
                unique: resultInSeconds,
            }
            updateList(newEntry)
            setOneState('')
            setTwoState('')
            setTourneyState('')
            setYearState('')

            alert('Success :)')
        } else {
            alert('You must fill out all fields!')
        }

    }

    return (
        <div>
            <div className='flex flex-row justify-center'>
                <h1 className='font-sans font-black text-white text-5xl p-5'>---- Add a Match ----</h1>
            </div>
            <form className='bg-primary' onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 p-5">


                    <div className='flex flex-row justify-center items-center'>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Player 1</span>
                            </label>
                            <input onChange={(e) => setOneState(e.target.value)} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={oneState} />
                        </div>
                    </div>

                    <div className='flex flex-row justify-center items-center'>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Player 2</span>
                            </label>
                            <input onChange={(e) => setTwoState(e.target.value)} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={twoState} />
                        </div>
                    </div>

                    <div className='flex flex-row justify-center items-center'>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Tournament</span>
                            </label>
                            <input onChange={(e) => setTourneyState(e.target.value)} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={tourneyState} />
                        </div>
                    </div>

                    <div className='flex flex-row justify-center items-center'>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Year</span>
                            </label>
                            <input onChange={(e) => setYearState(e.target.value)} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={yearState} />
                        </div>
                    </div>


                </div>
                <div className='flex flex-row justify-center p-6'>
                    <button type='submit' className='btn btn-secondary btn-md'>
                        Submit!
                    </button>
                </div>
            </form>
        </div>

    )
}

export default InfoForm