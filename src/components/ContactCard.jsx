import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, ChevronRight } from 'lucide-react';

const ContactCard = ({ contact }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
      className="contact-card glass-card"
    >
      <div className="contact-info">
        <div 
          className="avatar" 
          style={{ backgroundColor: contact.color || '#3b82f6' }}
        >
          {contact.initials}
        </div>
        <div className="details">
          <h3>{contact.name}</h3>
          <div className="meta">
            <span className="meta-item">
              <Mail size={14} /> {contact.email}
            </span>
            <span className="meta-item">
              <Phone size={14} /> {contact.phone}
            </span>
          </div>
        </div>
      </div>
      <div className="action">
        <ChevronRight size={20} className="chevron" />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .contact-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem;
          margin-bottom: 1rem;
          cursor: pointer;
          transition: border-color 0.2s ease;
        }
        .contact-card:hover {
          border-color: rgba(255, 255, 255, 0.2);
        }
        .contact-info {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .avatar {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 1.1rem;
          color: white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        .details h3 {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
          color: var(--primary);
        }
        .meta {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: var(--secondary);
        }
        .chevron {
          color: var(--secondary);
          opacity: 0.4;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }
        .contact-card:hover .chevron {
          opacity: 1;
          transform: translateX(4px);
        }
      `}} />
    </motion.div>
  );
};

export default ContactCard;
