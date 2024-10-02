import React from 'react';

const Ticket = ({ ticket }) => {
  return (
    <div className="ticket">
      <div className="ticket-header">
        <span className="ticket-id">{ticket.id}</span>
        <span className="user-initials">US</span>
      </div>
      <h3 className="ticket-title">{ticket.title}</h3>
      <div className="ticket-tags">
        <span className="tag priority-tag">
          <span className="exclamation-icon">!</span>
        </span>
        <span className="tag feature-tag">Feature Request</span>
      </div>
    </div>
  );
};

export default Ticket;