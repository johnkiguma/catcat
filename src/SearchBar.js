import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';

const App = () => {
  const [foods, setFoods] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  // Function to fetch data from the JSON server
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/foods'); // Replace with your JSON server URL
      const data = await response.json();
      setFoods(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  return (
    <div>
      <SearchBar foods={foods} onSearch={handleSearch} />
      <div>
        {/* Render the search results here */}
        {searchResults.map(food => (
          <div key={food.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
            <h3>{food.name}</h3>
            <p>Cuisine: {food.cuisine}</p>
            <p>Rating: {food.rating}</p>
            <p>Price: ${food.menu && food.menu.length > 0 ? food.menu[0].price : 'N/A'}</p>
            <div>
              {/* Render menu items if available */}
              {food.menu && food.menu.length > 0 && (
                <ul>
                  {food.menu.map(item => (
                    <li key={item.id}>
                      {item.name} - ${item.price}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {/* Add more details as needed */}
            <img src={food.menu && food.menu.length > 0 ? food.menu[0].imageUrl : 'https://placekitten.com/200/300'} alt={food.name} style={{ maxWidth: '100%' }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
