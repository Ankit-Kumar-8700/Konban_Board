import React, { useEffect, useState } from 'react';
import { fetchTickets } from '../api';
import TicketCard from './TicketCard';
import DisplayOptions from './DisplayOptions';
import '../styles.css';
import GroupHeader from './GroupHeader';

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState(() => localStorage.getItem('groupBy') || 'status');
  const [sortBy, setSortBy] = useState(() => localStorage.getItem('sortBy') || 'priority');
  const [groupedTickets, setGroupedTickets] = useState({});
  const [sortedTickets, setSortedTickets] = useState([]);

  useEffect(() => {
    const getTickets = async () => {
      const data = await fetchTickets();
      setTickets(data.tickets); // Assuming API gives a tickets array
      setUsers(data.users);
    };
    getTickets();

    // Load saved groupBy and sortBy from localStorage if available
    if (localStorage.getItem('groupBy')) setGroupBy(localStorage.getItem('groupBy'));
    if (localStorage.getItem('sortBy')) setSortBy(localStorage.getItem('sortBy'));
  }, []);

  useEffect(() => {
    // Group the tickets
    const grouped = groupTickets(tickets, groupBy);

    // Sort the tickets within each group
    const sorted = sortTicketsInGroups(grouped, sortBy);

    // Update the grouped tickets state
    setGroupedTickets(sorted);

    // Save current preferences to localStorage
    localStorage.setItem('groupBy', groupBy);
    localStorage.setItem('sortBy', sortBy);
  }, [tickets, groupBy, sortBy]);

   // Function to map userId to user name for grouping by user
   const getUserName = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.name : 'Unknown User';
  };

  // Group tickets based on the selected option
  const groupTickets = (tickets, groupBy) => {
    const grouped = {};

    tickets.forEach(ticket => {
      let groupKey;
      if (groupBy === 'status') {
        groupKey = ticket.status;
      } else if (groupBy === 'user') {
        groupKey = getUserName(ticket.userId); // Map userId to name
      } else if (groupBy === 'priority') {
        groupKey = ticket.priority;
      }

      if (!grouped[groupKey]) {
        grouped[groupKey] = [];
      }
      grouped[groupKey].push(ticket);
    });

    if(groupBy === 'status'){
      grouped['Done'] = [];
      grouped['Canceled'] = [];
    }

    return grouped;
  };

  // Sort tickets within each group based on the selected option
  const sortTicketsInGroups = (groupedTickets, sortBy) => {
    const sortedGroups = {};

    Object.keys(groupedTickets).forEach(groupKey => {
      const group = [...groupedTickets[groupKey]];

      if (sortBy === 'priority') {
        group.sort((a, b) => b.priority - a.priority); // Descending priority
      } else if (sortBy === 'title') {
        group.sort((a, b) => a.title.localeCompare(b.title)); // Ascending title
      }

      sortedGroups[groupKey] = group;
    });

    return sortedGroups;
  };

  return (
    <div className="kanban-board">
      <DisplayOptions
        groupBy={groupBy}
        setGroupBy={setGroupBy}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <div className="kanban-columns">
        {Object.keys(groupedTickets).map(group => (
          <div key={group} className="kanban-column">
            <GroupHeader group={group} groupBy={groupBy} items={groupedTickets[group].length} />
            {groupedTickets[group].map(ticket => (
              <TicketCard key={ticket.id} ticket={ticket} user={getUserName(ticket.userId)} groupBy={groupBy} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};



export default KanbanBoard;