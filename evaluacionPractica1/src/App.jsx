import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DogCard from './components/DogCard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <DogCard></DogCard>
  )
}

export default App
