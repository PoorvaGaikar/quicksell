import React from 'react';
import Column from './Column';

const KanbanBoard = ({ tickets, users, groupBy, sortBy }) => {
  const groupTickets = (tickets, groupBy) => {
    return tickets.reduce((acc, ticket) => {
      let key;
      switch (groupBy) {
        case 'status':
          key = ticket.status;
          break;
        case 'user':
          const user = users.find(u => u.id === ticket.userId);
          key = user ? user.name : 'Unassigned';
          break;
        case 'priority':
          const priorities = ['No priority', 'Low', 'Medium', 'High', 'Urgent'];
          key = priorities[ticket.priority] || 'Unknown';
          break;
        default:
          key = 'Other';
      }
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(ticket);
      return acc;
    }, {});
  };

  const sortTickets = (tickets, sortBy) => {
    return tickets.sort((a, b) => {
      if (sortBy === 'priority') {
        return b.priority - a.priority;
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  };

  const groupedTickets = groupTickets(tickets, groupBy);

  Object.keys(groupedTickets).forEach(key => {
    groupedTickets[key] = sortTickets(groupedTickets[key], sortBy);
  });

  const getColumnOrder = () => {
    switch (groupBy) {
      case 'status':
        return ['Backlog', 'Todo', 'In Progress', 'In progress', 'Done', 'Canceled'];
      case 'priority':
        return ['Urgent', 'High', 'Medium', 'Low', 'No priority'];
      case 'user':
        return [...new Set(users.map(user => user.name)), 'Unassigned'].sort();
      default:
        return Object.keys(groupedTickets);
    }
  };

  const columnOrder = getColumnOrder();

  return (
    <div className="kanban-board">
      {columnOrder.map(columnTitle => {
        const columnTickets = groupedTickets[columnTitle] || [];
        return (
          <Column
            key={columnTitle}
            title={columnTitle}
            tickets={columnTickets}
            count={columnTickets.length}
          />
        );
      })}
    </div>
  );
};

export default KanbanBoard;