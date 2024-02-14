import React, { useState, useEffect } from 'react';

const SearchBar = () => {
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/foods')
      .then(response => response.json())
      .then(data => setFoods(data.foods))
      .catch(error => console.error('Error fetching ', error));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredFoods = foods.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input type="text" placeholder="Search for food" onChange={handleSearch} />
      <ul>
        {filteredFoods.map(food => (
          <li key={food.id}>
            <h3>{food.name}</h3>
            <p>{food.cuisine}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;