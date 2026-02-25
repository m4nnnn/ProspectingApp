import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './main'
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


} 
 


export default App
