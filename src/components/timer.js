import { useEffect, useState } from 'react'
import Reaper from '../voldemort.png'
import { TOTAL_SECONDS } from '../utils/constants'

const LEFT_START = '-400px'

export default function Timer({ secondsLeft, setSecondsLeft }) {
  const [showReaper, setShowReaper] = useState(false)
  const [left, setLeft] = useState(LEFT_START)
  const [going, setGoing] = useState(false)
  useEffect(() => {
    setSecondsLeft(TOTAL_SECONDS)
    setShowReaper(false)
    setLeft(LEFT_START)
  }, [setSecondsLeft])

  useEffect(() => {
    const interval = setInterval(() => {
      if (showReaper) {
        const leftInt = parseInt(left.split('px')) + 5
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
    }, 1000)

    return () => clearInterval(interval)
  }, [going, secondsLeft, setSecondsLeft])
  return (
    <>
      <div className="bg-white pb-24 sm:pb-32 px-6 sm:px-12 fixed top-0 w-full border-bottom shadow-xl left-0 right-0">
        <div className="flex apart">
          <h1 className="text-2xl font-bold">standup</h1>
          <a
            href="https://github.com/thall1961/standup"
            className="text-xl font-bold"
          >
            github
          </a>
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto">
            <div className="mb-6">
              <h2 className="text-9xl font-black mt-12 text-center">
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
    </>
  )
}
