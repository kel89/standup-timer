import { people } from '../utils/constants'
import { useState } from 'react'

function shuffle(arr) {
  let currentIndex = arr.length,
    randomIndex

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex],
      arr[currentIndex],
    ]
  }

  return arr
}

const teamMembers = shuffle(people)

export default function Example({ handleCheckboxClick, current }) {
  const [cur, setCur] = useState(
    people.findIndex((person) => person.name === current.name),
  )

  function handleClick(person, index) {
    setCur(index + 1)
    handleCheckboxClick(person)
  }

  return (
    <ul
      style={{ marginTop: '450px' }}
      className="mx-auto grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
    >
      {teamMembers.map((person, index) => (
        <li
          key={person.name}
          onClick={() => handleClick(person, index)}
          className={`${
            index === cur ? 'drop-shadow-xl shadow-xl rounded -z-10' : ''
          } ${
            person.done ? 'bg-gray-800' : ''
          } rounded p-1.5 hover:cursor-pointer`}
        >
          <img
            className="mx-auto h-24 w-24 rounded-full"
            src={
              person.imageUrl ??
              'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png'
            }
            alt=""
          />
          <h3
            className={`mt-6 text-base font-semibold leading-7 tracking-tight ${
              person.done ? 'text-white' : 'text-gray-900'
            }`}
          >
            {person.name}
          </h3>
          <p className="text-sm leading-6 text-gray-600">{person.role}</p>
        </li>
      ))}
    </ul>
  )
}
