import Confetti from 'react-confetti'
import { useRef, useState } from 'react'
import './input.css'
import './App.css'
import Team from './components/team'
import Timer from './components/timer'
import { TOTAL_SECONDS } from './utils/constants'

function App() {
  const [display, setDisplay] = useState('none')
  const [secondsLeft, setSecondsLeft] = useState(0)
  const windowSize = useRef([window.innerWidth, window.innerHeight])

  function showConfetti() {
    setDisplay('block')
    setTimeout(() => {
      setDisplay('none')
    }, 1000)
  }

  function handleCheckboxClick(person) {
    showConfetti()
    person.done = true
    setSecondsLeft(TOTAL_SECONDS)
  }

  return (
    <div className="container mx-auto pb-24">
      <Timer
        secondsLeft={secondsLeft}
        setSecondsLeft={setSecondsLeft}
      />
      <Team handleCheckboxClick={handleCheckboxClick} />
      <Confetti
        style={{ display }}
        width={windowSize[0]}
        height={windowSize[1]}
      />
    </div>
  )
}

export default App
