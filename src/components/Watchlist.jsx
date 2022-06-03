import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import InfoForm from './InfoForm'
import Match from './shared/Match'

// Notes: animation only works on the first item added for some reason (or the last one i delete)

function Watchlist() {
    const [allEntries, setAllEntries] = useState([])

    const updateEntries = (item) => {
        setAllEntries([item, ...allEntries])
    }

    const deleteEntry = (identifier) => {
        if (window.confirm('Are you sure want to delete?')) {
            setAllEntries(allEntries.filter((entry) => entry.unique !== identifier))
        }
    }

    return (
        <>
            <div className='bg-primary mt-3 mr-5 ml-5 mb-3 rounded-xl'>
                <InfoForm updateList={updateEntries} />
            </div>
            <section id="match-list" className='flex flex-col justify-start items-center p-7' style={{ minHeight: '100vh' }}>
                <h1 className="font-sans font-black text-white text-5xl p-5">---- Your Watchlist ----</h1>
                <AnimatePresence>
                    {allEntries.map((item) => (
                        <motion.div
                            key={item.unique}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <Match deleteFunction={deleteEntry} identifier={item.unique} playerOne={item.p1} playerTwo={item.p2} tourney={item.tourney} year={item.year} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </section>
        </>
    )
}

export default Watchlist