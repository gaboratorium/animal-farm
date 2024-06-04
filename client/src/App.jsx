import { useEffect, useState } from 'react'
import './App.css'

const serverUrl = window.location.hostname === 'localhost' 
  ? 'http://localhost:8080'
  : 'https://animal-farm-backend.vercel.app';

function useAnimalSearch() {
  const [animals, setAnimals] = useState([]);
  
  useEffect(() => {
    const lastQuery = localStorage.getItem('lastQuery');
    search(lastQuery);
  }, []);
  
  const search = async (q) => {
    const response = await fetch(
      `${serverUrl}?` + new URLSearchParams({ q })
    );
  
    const data = await response.json();
    console.log(data);
    setAnimals(data);
    localStorage.setItem('lastQuery', q);
  }

  return { search, animals };
}

function App() {

  const {search, animals } = useAnimalSearch();

  return (
    <main>
      <h1>Animal Farm</h1>
      <p>Start typing something 👇</p>
      <input type="text" placeholder="Search" onChange={(e) => search(e.target.value)} />
      <ul>
        {animals.map((animal) => (
          <Animal key={animal.id} {...animal}></Animal>
        ))}
      </ul>

      {animals.length === 0 && 'No animals found'}
    </main>
  )
}

function Animal ({type, name, age}) {
  return (
    <li>
      <strong>{type}</strong> {name} {age}
    </li>
  )
}

export default App
