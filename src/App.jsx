import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './main'
import DashBoardPage from './pages/DashBoardPage'
import HeaderPage from './pages/HeaderPage'
import FooterPage from './pages/FooterPage'

function App() {



  return (
    <section>
    <HeaderPage/>
    <DashBoardPage/>
    <FooterPage/>
    </section>
  )
}

export default App
