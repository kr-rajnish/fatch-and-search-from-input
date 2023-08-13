// Design a Layout with following requirements (ReactJS)

// 1. Fetch Data from here : https://jsonplaceholder.typicode.com/users using Fetch API

// 2. Use this data to search in Input Box

// 3. Input box should have Autocomplete (Name Field)

// 4. Autocomplete should be implemented with Debouncing (Custom Function)

import "./styles.css";
import React, { useState, useEffect } from "react";

const App = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [autocompleteResults, setAutocompleteResults] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    // Filter autocomplete results based on the search term
    const filteredResults = data.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setAutocompleteResults(filteredResults);
  }, [searchTerm, data]);

  const handleInputChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
  };

  return (
    <div>
      <h1>User Search with Autocomplete</h1>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <ul>
        {autocompleteResults.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
