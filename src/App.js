import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';

// MAIN PAGES
import RankingsPage from './pages/RankingsPage'
import SearchPage from './pages/SearchPage'
import WatchlistPage from './pages/WatchlistPage'
import AboutPage from './pages/AboutPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={
          <WatchlistPage />
        } />
        <Route path='/track' element={
          <SearchPage />
        } />
        <Route path='/rankings' element={
          <RankingsPage />
        } />
        <Route path='/about' element={
          <AboutPage />
        } />
      </Routes>
    </Router>
  )
}

export default App;
