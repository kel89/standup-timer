import { useEffect, useState } from 'react'
import Reaper from '../voldemort.png'
import { TOTAL_SECONDS } from '../utils/constants'

export default function Timer({ secondsLeft, setSecondsLeft, showReaper, setShowReaper, LEFT_START, left, setLeft }) {
  const [going, setGoing] = useState(false)
  const [showList, setShowList] = useState(false);
  useEffect(() => {
      setSecondsLeft(TOTAL_SECONDS)
      setShowReaper(false)
      setLeft(LEFT_START)
    },
    [LEFT_START, setLeft, setSecondsLeft, setShowReaper])

  useEffect(() => {
    const interval = setInterval(() => {
      if (showReaper) {
        const leftInt = parseInt(left.split('px')) + 5
        setLeft(`${leftInt}px`)
      }
    }, 100)
    return () => clearInterval(interval)
  }, [left, setLeft, showReaper])

  useEffect(() => {
    const interval = setInterval(() => {
      if (going) {
        setSecondsLeft(secondsLeft > 0 ? secondsLeft - 1 : 0)
      }
      if (secondsLeft === 0) {
        setShowReaper(true)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [going, secondsLeft, setSecondsLeft, setShowReaper])
  return (
    <div className="relative">
      <div className="bg-white pb-6 sm:pb-24 px-6 sm:px-12 fixed top-0 w-full border-bottom shadow-xl left-0 right-0">
        <div className="flex apart">
          <h1 className="text-2xl font-bold">standup</h1>
          <a
            href="https://github.com/thall1961/standup"
            className="text-xl font-bold flex flex-col justify-center"
          >
            <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="" width="20"/>
          </a>
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto">
            <div className="mb-6">
              <h2 className="text-9xl font-black mt-3 text-center">
                {secondsLeft}
              </h2>
              <p className="text-center">seconds left</p>
            </div>
          </div>
          <button
            className="bg-indigo-500 block mx-auto w-200 text-white text-xl mt-5 py-8 px-12 rounded shadow hover:bg-indigo-900 hover:shadow-xl transition"
            onClick={() => setGoing(!going)}
          >
            Start/Stop
          </button>
        </div>
        <button onClick={() => setShowList(!showList)} className="block mx-auto mt-3 border p-1.5 text-sm">Show List</button>
        <div style={{ height: `${showList ? '100px' : '0'}`, bottom: '-100px'}} className="bg-white rounded shadow left-0 right-0 absolute overflow-hidden">
          <p className="text-center">Dashboard - review team goals</p>
          <p className="text-center">Product calendar quick look</p>
          <p className="text-center">[Monday] Time off calendar quick look</p>
        </div>
      </div>
      <img
        src={Reaper}
        width="300"
        alt="reaper"
        style={{
          left: left,
          display: showReaper ? 'block' : 'none',
          transition: '3s position',
          position: 'absolute',
          top: '0',
        }}
      />
    </div>
  )
}
