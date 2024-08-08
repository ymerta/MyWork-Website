import React, { useState, ChangeEvent, FormEvent } from 'react';
import '../styles/SearchBarStyle.css';
import searchIcon from '../styles/img/search.svg';

interface SearchBarProps {
  placeholder: string;
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onSearch }) => {
  const [query, setQuery] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="input-container">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="search-input"
        />
        <button type="submit" className="search-icon-button">
          <img src={searchIcon} alt="Search" className="search-icon" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
