import Navbar from '../components/shared/Navbar'

function AboutPage() {
  return (
    <>
      <Navbar />
      <br />
      <br />
      <br />
      <section className="flex flex-row justify-center items-center">


        <div className='prose'>
          <h3>
            A Tennis Tracker App that lets you add verified matches to a watchlist, search for players, and view live rankings.
          </h3>
          <h4>Covers both the ATP and WTA circuit.</h4>
          <h4>Built with React and Firebase (used Firebase Authentication, Firestore)</h4>
          <ul>API Limitations I've noticed (using Tennis Live Data API from RapidAPI):</ul>

          <li>Player names with variable spelling can sometimes change. e.g. Djokovic, Dokovic</li>
          <li>Data pertaining to RACE RANKINGS (Race Rank, Race Points) are incorrect/outdated, whereas LIVE RANKING data is fine</li>
        </div>
      </section>
    </>
  )
}

export default AboutPage