import Login from '../pages/Login/Login'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import './App.css'
import Register from '../pages/Register/Register'
import Home from '../pages/Home/Home'

function App() { 

  return (
    <div>  
      <Routes>   
        <Route path='/login' element = {<Login/>} />         {/* url ekee "/login" meeka gahuwoth ookata yanawa */}
        <Route path='/register' element = {<Register/>} />
        <Route path='/home' element = {<Home/>} />
      </Routes>
    </div>
  )
}

export default App
