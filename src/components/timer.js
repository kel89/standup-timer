import { useEffect, useState } from 'react'
import Reaper from '../sonic.png'
import { TOTAL_SECONDS } from '../utils/constants'

export default function Timer({
  secondsLeft,
  setSecondsLeft,
  showReaper,
  setShowReaper,
  LEFT_START,
  left,
  setLeft,
}) {
  const [going, setGoing] = useState(false)
  useEffect(() => {
    setSecondsLeft(TOTAL_SECONDS)
    setShowReaper(false)
    setLeft(LEFT_START)
  }, [LEFT_START, setLeft, setSecondsLeft, setShowReaper])

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
      <div className="bg-white px-6 sm:px-12 fixed top-0 w-full border-bottom shadow-xl left-0 right-0">
        <div className="flex apart">
          <h1 className="text-2xl font-bold">stand<u>up</u></h1>
          <a
            href="https://github.com/thall1961/standup"
            className="text-xl font-bold flex flex-col justify-center"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
              alt=""
              width="20"
            />
          </a>
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-6">
          <div className="mx-auto">
            <div className="mb-6">
              <h2 className="text-9xl font-black mt-3 text-center">
                {secondsLeft}
              </h2>
            </div>
          </div>
          <button
            className="bg-teal-500 block mx-auto w-200 font-black text-white text-sm mt-5 py-2 px-6 rounded shadow-xl hover:bg-teal-900 hover:shadow-xl transition uppercase"
            onClick={() => setGoing(!going)}
          >
            toggle
          </button>
          <a href="https://app.clickup.com/2277049/dashboards/25fnt-1410" target="_blank" rel="noreferrer" className="text-teal-500 mt-3 text-sm font-bold uppercase block mx-auto text-center">dashboard &rarr;</a>
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
