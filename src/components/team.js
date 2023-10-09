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
  const [setCur] = useState(
    people.findIndex((person) => person.name === current.name),
  )

  function handleClick(person, index) {
    setCur(index + 1)
    handleCheckboxClick(person)
  }

  return (
    <ul
      style={{ marginTop: '400px' }}
      className="mx-auto max-w-2xl gap-x-8 gap-y-16 text-center lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
    >
      {teamMembers.map((person, index) => (
        <li
          key={person.name}
          onClick={() => handleClick(person, index)}
          className={`${
            person.done ? 'bg-gray-800' : ''
          } rounded p-1.5 hover:cursor-pointer block my-1.5`}
        >
          <h3
            className={`py-1.5 text-sm font-semibold leading-7 tracking-tight ${
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
