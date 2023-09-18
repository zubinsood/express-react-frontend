
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from '../Pages/Index';
import Show from '../Pages/Show';

function Main(props) {
  const [people, setPeople] = useState(null);

  const URL = 'http://localhost:3001/people/';

  const getPeople = async () => {
    try {
      const response = await fetch(URL);
      const data = await response.json();
      setPeople(data);
    } catch (error) {
      // TODO: Add a task we wish to perform in the event of an error
    }
  }

  const createPeople = async (person) => {
    try {
      await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
        },
        body: JSON.stringify(person),
      });
      getPeople();
    } catch (error) {
      // TODO: Add a task we wish to perform in the event of an error
    }
  }

  useEffect(() => {
    getPeople();
  }, []);

  return (
    <main>
      <Routes>
        <Route 
          path="/" 
          element={<Index people={people} createPeople={createPeople} />} 
        />
        <Route path="/people/:id" element={<Show />} />
      </Routes>
    </main>
  );
}

export default Main;