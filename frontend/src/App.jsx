import React from 'react'
import Login from './components/Login'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Add from './components/Add'
import { Route, Routes } from 'react-router-dom'
import PrivateRoutes from './components/PrivateRoutes'

const App = () => {
  return (
    <div>
       <Navbar/>
       <Routes>
        <Route path='/'element={<Home/>}></Route>
        <Route path='/login'element={<Login/>}></Route>
        <Route element={<PrivateRoutes/>}> <Route path='/add'element={<Add/>} ></Route></Route>
       
       </Routes>
    </div>
  )
}

export default App

