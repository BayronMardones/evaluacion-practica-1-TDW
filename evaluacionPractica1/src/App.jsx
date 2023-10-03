import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DogCard from './components/DogCard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <container><DogCard></DogCard></container>
  )
}

export default App
