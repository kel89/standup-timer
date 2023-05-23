import Confetti from "react-confetti";
import {useEffect, useRef, useState} from "react";
import './App.css'
import Reaper from './reaper.png'

function shuffle(arr) {
  let currentIndex = arr.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex], arr[currentIndex]];
  }

  return arr;
}

const teamMembers = shuffle([
  "Ben",
  "Bryan",
  "Eric",
  "Jay",
  "Jordan",
  "Kari",
  "Paulo",
  "Steven",
  "Mike",
  "Jeremy",
  "Parker",
  "Brant",
  "Kyle",
  "Tom",
"Isaac"
]);

const TOTAL_SECONDS = 64;
const LEFT_START = '-400px';

function Timer({current}) {
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS);
  const [showReaper, setShowReaper] = useState(false);
  const [left, setLeft] = useState(LEFT_START);
  const [going, setGoing] = useState(false);
  useEffect(() => {
    setSecondsLeft(TOTAL_SECONDS)
    setShowReaper(false)
    setLeft(LEFT_START)
  }, [current])

  useEffect(() => {
    const interval = setInterval(() => {
      if (showReaper) {
        const leftInt = parseInt(left.split('px')) + 5;
        setLeft(`${leftInt}px`)
      }
    }, 100)
    return () => clearInterval(interval)
  }, [left, showReaper])

  useEffect(() => {
    const interval = setInterval(() => {
      if (going) {
        setSecondsLeft(secondsLeft > 0 ? secondsLeft - 1 : 0)
      }
      if (secondsLeft === 0) {
        setShowReaper(true)
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [going, secondsLeft]);
  return (
    <>
      <div>
        <h2 style={{
          paddingTop: 0,
          marginTop: 0,
          color: secondsLeft > 0 ? secondsLeft > 5 ? 'green' : 'orange' : 'red'
        }}>{secondsLeft} seconds left</h2>
        <button onClick={() => setGoing(!going)}>Start/Stop</button>
      </div>
      <img src={Reaper} width="300" alt="reaper" style={{
        left: left,
        display: showReaper ? 'block' : 'none',
        transition: '3s position',
        position: 'absolute',
        top: '0'
      }}/>
    </>
  )
}

function App() {
  const [display, setDisplay] = useState('none');
  const [current, setCurrent] = useState(teamMembers[0])
  const windowSize = useRef([window.innerWidth, window.innerHeight]);

  function showConfetti() {
    setDisplay('block')
    setTimeout(() => {
      setDisplay('none')
    }, 1000)
  }

  function handleCheckboxClick(event) {
    setCurrent(event.target.value)
  }

  return (
    <>
      <div style={{padding: '40px', fontFamily: 'arial, sans-serif', maxWidth: '800px', margin: '0 auto'}}>
        <h1>STAND UP</h1>
        <div className="flex apart">
          <div>
            {teamMembers.map(t => (
              <div key={t} onClick={showConfetti} style={{padding: 0, margin: 0}}>
                <Confetti
                  style={{display}}
                  width={windowSize[0]}
                  height={windowSize[1]}
                />
                <input id={t} type="checkbox" value={t} onClick={handleCheckboxClick}/>
                <label htmlFor={t} key={t}>{t}</label>
              </div>))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
