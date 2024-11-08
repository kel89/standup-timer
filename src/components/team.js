import { useEffect, useState } from 'react';
import { people } from '../utils/constants';
import { shuffle } from '../utils/utils';

const teamMembers = shuffle(people)

export default function Team({handleCheckboxClick}) {
  const [allDone, setAllDone] = useState(false);
  const [members, setMembers] = useState(teamMembers);
  
  useEffect(() => {
    setAllDone(members.every(person => person.done))
  }, [members])

  function handleClick(person) {
    setMembers(members.map(p => p.name === person.name ? {...p, done: true} : p));
    handleCheckboxClick();
  }

  return (
    <ul
      style={{marginTop: '320px'}}
      className="mx-auto max-w-xs gap-x-8 gap-y-16 text-center grid-cols-1"
    >
      {allDone && <h1 className="text-black text-2xl font-bold">All done! Check Code Reviews</h1>}
      {members.map((person) => (
        <li
          key={person.name}
          onClick={() => handleClick(person)}
          className={`${
            person.done ? 'bg-gray-800' : 'hover:bg-blue-50'
          } rounded p-1.5 hover:cursor-pointer block my-1.5 flex items-center`}
        >
          <div className="w-12">
            {person.imageUrl && <img className={`h-8 w-8 border rounded-full ${person.done ? 'border-white' : 'text-gray-900'}`} src={`${person.imageUrl}`} alt=""/>}
          </div>
          <span
            className={`mr-3 text-2xl font-bold tracking-tight ${
              person.done ? 'text-white' : 'text-gray-900'
            }`}
          >
            {person.name}
          </span>
          <span className={`inline-block ml-auto pr-3 text-xs uppercase text-gray-900 ${person.done ? 'text-white' : 'text-gray-900'}`}>{person.role}</span>
        </li>
      ))}
    </ul>
  )
}
