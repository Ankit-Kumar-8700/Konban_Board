import React from 'react';
import './TicketCard.css'; // Import your styles
import { priorityIcon, statusSymbol, userInitials } from '../helper/iconHelper';

const TicketCard = ({ ticket, user, groupBy }) => {
  const { id, title, tag, priority, status } = ticket;

  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <span className="ticket-id">{id}</span>
        {groupBy!=='user' && <div className="user-initials">{userInitials(user)}</div>}
      </div>
      <div className="ticket-title-container">
        {groupBy!=='status' && <span className="status-symbol">{statusSymbol(status)}</span>}
        <h5 className="ticket-title">{title.length > 45 ? `${title.slice(0, 37)}...` : title}</h5>
      </div>
      <div className="ticket-footer">
        {groupBy!=='priority' && <div className="priority-icon">{priorityIcon(priority)}</div>}
        <ul className="tags">
          {tag.map((t, index) => (
            <li key={index} className="ticket-tag">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TicketCard;
