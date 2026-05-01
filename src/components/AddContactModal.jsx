import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Phone, Plus } from 'lucide-react';

const AddContactModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    
    const initials = formData.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    onAdd({
      ...formData,
      id: Date.now(),
      initials,
      color: randomColor
    });
    
    setFormData({ name: '', email: '', phone: '' });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="modal-overlay"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="modal-content glass-card"
          >
            <div className="modal-header">
              <h2>Add New Contact</h2>
              <button onClick={onClose} className="close-btn"><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="input-group">
                <label><User size={16} /> Name</label>
                <input
                  required
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="input-group">
                <label><Mail size={16} /> Email</label>
                <input
                  required
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="input-group">
                <label><Phone size={16} /> Phone</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <button type="submit" className="submit-btn">
                <Plus size={18} /> Add Contact
              </button>
            </form>
          </motion.div>
        </>
      )}
      <style dangerouslySetInnerHTML={{ __html: `
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          z-index: 1000;
        }
        .modal-content {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 90%;
          max-width: 450px;
          padding: 2rem;
          z-index: 1001;
          border-color: rgba(255, 255, 255, 0.15);
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        .modal-header h2 {
          font-size: 1.5rem;
          font-weight: 700;
        }
        .close-btn {
          color: var(--secondary);
          padding: 0.5rem;
          border-radius: 50%;
        }
        .close-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: var(--primary);
        }
        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .input-group label {
          font-size: 0.9rem;
          color: var(--secondary);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .input-group input {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          padding: 0.75rem 1rem;
          border-radius: 10px;
          color: var(--primary);
          transition: all 0.2s ease;
        }
        .input-group input:focus {
          border-color: var(--accent);
          background: rgba(255, 255, 255, 0.08);
        }
        .submit-btn {
          margin-top: 1rem;
          background: var(--primary);
          color: var(--background);
          padding: 0.85rem;
          border-radius: 12px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .submit-btn:hover {
          transform: scale(1.02);
          box-shadow: 0 4px 20px rgba(255, 255, 255, 0.1);
        }
      `}} />
    </AnimatePresence>
  );
};

export default AddContactModal;
