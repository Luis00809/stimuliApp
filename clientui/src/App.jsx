import { Outlet } from 'react-router-dom';
import NavBar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  function fetchData() {
    const token = localStorage.getItem('id_token');
    fetch('/api/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  }

  return (
    <>
      <NavBar />
        <Outlet />    
    </>
  )
}

export default App
