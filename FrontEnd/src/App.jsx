
import { Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './components/Login.jsx'
import Register from './components/Register.jsx'
import ButtonAppBar from './components/Navbar.jsx'
import UserLandingPage from './components/UserLandingPage.jsx'
import Temp from './components/Temp.jsx'



function App() {
  

  return (
    <>
   
    <Routes>
      <Route path='/' element={<ButtonAppBar/>} />
     <Route path='/login' element={<LoginPage/>} />
     <Route path='/register' element={<Register/>} />
     <Route path='/UserLandingPage' element={<UserLandingPage/>} />
     <Route path='/temp' element={<Temp/>} />

     </Routes>
     

    </>
  )
}

export default App
