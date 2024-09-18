// utils.js

export const priorityIcon = (priority) => {
    switch (parseInt(priority, 10)) {
      case 4:
        return '❗'; // Urgent
      case 3:
        return '⚠️'; // High
      case 2:
        return '🔔'; // Medium
      case 1:
        return 'ℹ️'; // Low
      default:
        return '❓'; // No priority
    }
  };
  
  export const statusSymbol = (status) => {
    switch (status) {
      case 'Todo':
        return '🟢'; // Todo
      case 'In progress':
        return '🟡'; // In Progress
      case 'Backlog':
        return '🔴'; // Backlog
      default:
        return '⚪'; // Default/Unknown status
    }
  };
  
  export const userInitials = (user) => {
    if (!user) return '??';
    const initials = user.split(' ').map(n => n[0]).join('');
    return initials.toUpperCase();
  };
  