import React, { useState, useEffect } from 'react';
import { fetchTickets } from './api';
import Header from './components/Header';
import KanbanBoard from './components/KanbanBoard';
import './App.css';

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [groupBy, setGroupBy] = useState('status');
  const [sortBy, setSortBy] = useState('priority');

  useEffect(() => {
    const getTickets = async () => {
      try {
        const data = await fetchTickets();
        if (data) {
          setTickets(data.tickets);
          setUsers(data.users);
        }
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    getTickets();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="App">
      <Header
        onGroupChange={setGroupBy}
        onSortChange={setSortBy}
        currentGrouping={groupBy}
        currentOrdering={sortBy}
      />
      <KanbanBoard
        tickets={tickets}
        users={users}
        groupBy={groupBy}
        sortBy={sortBy}
      />
    </div>
  );
}

export default App;