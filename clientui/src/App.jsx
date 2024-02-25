import { Outlet } from 'react-router-dom';
import NavBar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';


import './App.css'

function App() {

  return (
    <>
      <NavBar />
      <Outlet />    
    </>
  )
}

export default App
