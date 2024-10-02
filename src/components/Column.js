import React from 'react';
import Ticket from './Ticket';

const Column = ({ title, tickets, count }) => {
  const getStatusIcon = (status) => {
    switch(status.toLowerCase()) {
      case 'backlog': return '⚪';
      case 'todo': return '🔵';
      case 'in progress': return '🟡';
      case 'done': return '🟢';
      case 'canceled': return '⭕';
      default: return '⭕';
    }
  };

  return (
    <div className="column">
      <div className="column-header">
        <div className="column-header-left">
          <span className="status-icon">{getStatusIcon(title)}</span>
          <h2 className="column-title">{title}</h2>
          <span className="ticket-count">{count}</span>
        </div>
        <div className="column-header-right">
          <button className="icon-button">+</button>
          <button className="icon-button">···</button>
        </div>
      </div>
      {tickets.length > 0 ? (
        tickets.map(ticket => <Ticket key={ticket.id} ticket={ticket} />)
      ) : (
        <div className="empty-column">No tickets</div>
      )}
    </div>
  );
};

export default Column;