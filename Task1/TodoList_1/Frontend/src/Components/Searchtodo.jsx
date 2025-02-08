import React, { useState } from "react";

const Searchtodo = () => {
  const [search, setSearch] = useState(""); // To store the search term
  const [searchResults, setSearchResults] = useState([]); // To store the search results

  const submitSearch = async (e) => {
    e.preventDefault();
    try {
      const body = { search };
      const response = await fetch(`http://localhost:3000/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const searchData = await response.json();

      // Set the search results
      setSearchResults(searchData);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Search Todos</h3>
      <div className="d-flex align-items-center">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Enter search term"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-success" onClick={submitSearch}>
          Search
        </button>
      </div>

      {/* Display Search Results */}
      <div className="mt-4">
        {searchResults.length > 0 ? (
          <ul className="list-group">
            {searchResults.map((todo, index) => (
              <li key={index} className="list-group-item">
                {todo.description}
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default Searchtodo;
