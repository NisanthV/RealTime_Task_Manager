import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/Login'
import Home from './pages/Home'
import Protected from './components/Protected'
import './App.css'

function App() {

  return (
    <BrowserRouter>

      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route element={<Protected />}>
        
          <Route path='/home' element={<Home />} />

        </Route>

      </Routes>
    

    </BrowserRouter>

  )
}

export default App
