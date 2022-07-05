import { useState, useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore'
import { doc, addDoc, deleteDoc, server, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import InfoForm from './InfoForm'
import Match from './shared/Match'
import Spinner from './shared/Spinner'
import { GiTennisRacket } from "react-icons/gi"
import { GiTennisCourt } from "react-icons/gi"

function Watchlist() {
    const auth = getAuth()

    const [allEntries, setAllEntries] = useState([])
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
    })
    const [loading, setLoading] = useState(true)

    const updateEntries = async (item) => {
        const newEntry = item

        const docRef = await addDoc(collection(db, 'matches'), newEntry)
        // setLoading(false)
        toast.success('Match saved')
        setAllEntries([item, ...allEntries])
    }

    const deleteEntry = async (identifier) => {
        if (window.confirm('Are you sure want to delete?')) {

            setAllEntries(allEntries.filter((entry) => entry.unique !== identifier))

            // Get reference
            const matchesRef = collection(db, 'matches')
            // Create a query
            const q = query(matchesRef, where('unique', '==', identifier), limit(10))
            // Execute query
            const querySnap = await getDocs(q)
            // Initialize a variable to store the toBeDeleted doc.id
            let deleteThisId = ''
            // Find the right doc.id
            querySnap.forEach((doc) => {
                if (doc.data().unique === identifier) {
                    console.log(doc.id)
                    deleteThisId = doc.id
                }
            })
            await deleteDoc(doc(db, 'matches', deleteThisId))
            toast.success('Match deleted')
        }
    }

    const navigate = useNavigate()

    const onLogout = () => {
        auth.signOut()
        navigate('/sign-in')
    }

    useEffect(() => {
        const fetchListings = async () => {
            try {
                // Get reference
                const matchesRef = collection(db, 'matches')

                // Create a query
                const q = query(matchesRef, where('owner', '==', auth.currentUser.uid), limit(10))
                // Execute query
                const querySnap = await getDocs(q)
                const matches = []
                querySnap.forEach((doc) => {
                    return matches.push({
                        unique: doc.data().unique,
                        p1: doc.data().p1,
                        p1ID: doc.data().p1ID,
                        p2: doc.data().p2,
                        p2ID: doc.data().p2ID,
                        roundName: doc.data().roundName,
                        tourney: doc.data().tourney,
                        court: doc.data().court,
                        year: doc.data().year,
                        owner: doc.data().owner,
                    })
                })

                setAllEntries(matches)
                setLoading(false)
            } catch (error) {
                console.log(error);
                toast.error('Could not fetch listings')
            }
        }
        fetchListings()
    }, [])

    return (
        <>
            {loading && <Spinner />}
            <div className='bg-primary mt-3 mr-5 ml-5 mb-3 rounded-xl'>
                <InfoForm updateList={updateEntries} />
            </div>
            <section id="match-list" className='flex flex-col justify-start items-center p-7' style={{ minHeight: '30vh' }}>
                <div className='flex flex-row justify-center items-center'>
                    <GiTennisRacket size={40} />
                    <h1 className='font-sans font-black text-white text-5xl p-5'>Your Watchlist</h1>
                    <GiTennisRacket size={40} />
                </div>
                {allEntries.length === 0 &&
                    <div className='flex flex-col items-center'>
                        <h2>Nothing here for now...</h2>
                        <GiTennisCourt size={250} />
                    </div>
                }
                <AnimatePresence>
                    {allEntries.map((item) => (
                        <motion.div
                            key={item.unique}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <Match deleteFunction={deleteEntry} identifier={item.unique} playerOne={item.p1} playerOneID={item.p1ID} playerTwo={item.p2} playerTwoID={item.p2ID} court={item.court} roundName={item.roundName}tourney={item.tourney} year={item.year} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </section>
            <div className="logout flex flex-row justify-end">
                <div className='flex flex-col justify-center'>
                    <div className="badge badge-warning badge-lg">Logged in as&nbsp;<b>{auth.currentUser.displayName}</b></div>
                </div>
                <button className="btn btn-error btn-md m-10" type='button' onClick={onLogout}>Logout</button>
            </div>
        </>
    )
}

export default Watchlist