import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';

// MAIN PAGES
import HomePage from './pages/HomePage'
import TrackPage from './pages/TrackPage'
import WatchlistPage from './pages/WatchlistPage'
import AboutPage from './pages/AboutPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={
          <HomePage />
        } />
        <Route path='/track' element={
          <TrackPage />
        } />
        <Route path='/watchlist' element={
          <WatchlistPage />
        } />
        <Route path='/about' element={
          <AboutPage />
        } />
      </Routes>
    </Router>
  )
}

export default App;
