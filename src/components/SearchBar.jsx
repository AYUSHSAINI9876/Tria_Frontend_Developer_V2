import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="search-container">
      <div className="search-wrapper glass-card">
        <Search size={20} className="search-icon" />
        <input
          type="text"
          placeholder="Search contacts by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .search-container {
          margin-bottom: 2rem;
        }
        .search-wrapper {
          display: flex;
          align-items: center;
          padding: 0.75rem 1.25rem;
          gap: 1rem;
          transition: all 0.3s ease;
          border: 1px solid var(--glass-border);
        }
        .search-wrapper:focus-within {
          border-color: rgba(255, 255, 255, 0.3);
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 0 20px rgba(0,0,0,0.2);
        }
        .search-icon {
          color: var(--secondary);
        }
        .search-input {
          background: none;
          color: var(--primary);
          width: 100%;
          font-size: 1rem;
        }
        .search-input::placeholder {
          color: var(--secondary);
          opacity: 0.6;
        }
      `}} />
    </div>
  );
};

export default SearchBar;
