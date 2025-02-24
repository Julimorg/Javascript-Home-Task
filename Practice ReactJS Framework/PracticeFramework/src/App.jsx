import { useState } from 'react'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './Pages/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Route, Routes } from 'react-router-dom';
import MovieDetail from './components/MovieDetail';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };
  return (
   <div className={isDarkMode ? "bg-dark text-light min-vh-100" : "bg-light text-dark min-vh-100"}>
    <NavBar isDarkMode = {isDarkMode} toggleTheme = {toggleTheme} />
    <Routes>
      <Route path = "/" element = {<Home isDarkMode = {isDarkMode}/>} />
      <Route path = "/movie/:id" element = {<MovieDetail/>}/>
    </Routes>
    <Footer/>
   </div>
  )
}

export default App
