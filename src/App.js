import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PrivateRoute from './components/PrivateRoute'
// MAIN PAGES
import RankingsPage from './pages/RankingsPage'
import SearchPage from './pages/SearchPage'
import WatchlistPage from './pages/WatchlistPage'
import AboutPage from './pages/AboutPage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<PrivateRoute />}>
            <Route exact path='/' element={
              <WatchlistPage />
            } />
          </Route>
          <Route path='/track' element={<PrivateRoute />}>
            <Route path='/track' element={
              <SearchPage />
            } />
          </Route>
          <Route path='/rankings' element={<PrivateRoute />}>
            <Route path='/rankings' element={
              <RankingsPage />
            } />
          </Route>
          <Route path='/about' element={<PrivateRoute />}>
            <Route path='/about' element={
              <AboutPage />
            } />
          </Route>
          <Route path='/sign-in' element={
            <SignInPage />
          } />
          <Route path='/sign-up' element={
            <SignUpPage />
          } />
          <Route path='/forgot-password' element={
            <ForgotPasswordPage />
          } />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App;
