import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './main'
import DashBoardPage from './pages/DashBoardpage'

function App() {
const login = document.querySelector('.HeaderImg')
const quit = document.querySelectorAll('.Log-btn') 
const visible = document.querySelector('.LogFull')

login.addEventListener('click', () => {
    visible.style.display = 'flex'
})

quit.forEach (l => {
    l.addEventListener('click', () => {
        visible.style.display = 'none'
    } )
})


  return (
    
    <DashBoardPage/>
  )
}

export default App
