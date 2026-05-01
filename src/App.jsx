import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Users, Search as SearchIcon, Loader2 } from 'lucide-react';
import { initialContacts } from './mockData';
import ContactCard from './components/ContactCard';
import SearchBar from './components/SearchBar';
import AddContactModal from './components/AddContactModal';

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate API Fetch
  useEffect(() => {
    const timer = setTimeout(() => {
      setContacts(initialContacts);
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddContact = (newContact) => {
    setContacts(prev => [newContact, ...prev]);
  };

  return (
    <div className="container">
      <header className="app-header">
        <div className="brand">
          <div className="icon-box">
            <Users size={24} />
          </div>
          <div>
            <h1>Contacts</h1>
            <p>{contacts.length} people in your network</p>
          </div>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="add-btn-main"
        >
          <Plus size={20} />
          <span>Add Contact</span>
        </button>
      </header>

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <main className="content">
        {isLoading ? (
          <div className="loading-state">
            <Loader2 className="spinner" size={40} />
            <p>Loading your contacts...</p>
          </div>
        ) : (
          <div className="contact-list">
            <AnimatePresence mode="popLayout">
              {filteredContacts.length > 0 ? (
                filteredContacts.map(contact => (
                  <ContactCard key={contact.id} contact={contact} />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="empty-state"
                >
                  <SearchIcon size={48} />
                  <h3>No contacts found</h3>
                  <p>Try searching for someone else or add a new contact.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </main>

      <AddContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddContact}
      />

      <style dangerouslySetInnerHTML={{ __html: `
        .app-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3rem;
        }
        .brand {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .icon-box {
          background: var(--primary);
          color: var(--background);
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .brand h1 {
          font-size: 1.75rem;
          font-weight: 800;
          letter-spacing: -0.02em;
        }
        .brand p {
          color: var(--secondary);
          font-size: 0.9rem;
        }
        .add-btn-main {
          background: var(--glass);
          border: 1px solid var(--glass-border);
          color: var(--primary);
          padding: 0.75rem 1.25rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 600;
        }
        .add-btn-main:hover {
          background: var(--primary);
          color: var(--background);
          transform: translateY(-2px);
        }
        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem 0;
          gap: 1.5rem;
          color: var(--secondary);
        }
        .spinner {
          animation: spin 2s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .empty-state {
          text-align: center;
          padding: 4rem 0;
          color: var(--secondary);
        }
        .empty-state h3 {
          color: var(--primary);
          margin: 1rem 0 0.5rem;
        }
      `}} />
    </div>
  );
}

export default App;
