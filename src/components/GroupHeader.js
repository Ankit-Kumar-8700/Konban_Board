import React from 'react';
import './GroupHeader.css';
import { priorityIcon, statusSymbol, userInitials } from '../helper/iconHelper';

function GroupHeader({groupBy, group, items}) {
  return (
    <div className="group-header">
  <div className="header-left">
    <span className={"heading-icon" + (groupBy === 'user' ? " userLogo" : "")}>{groupBy === 'status' ? statusSymbol(group) : groupBy === 'priority' ? priorityIcon(group) : userInitials(group)}</span> {/* Replace with your desired icon */}
    <h2 className="heading-text">{groupBy === 'priority' ? mapPriorityToLabel(group) : group}</h2>
    <span className="card-count">{items}</span>
  </div>

  <div className="header-right">
    <span className="add-icon">+</span>
    <span className="more-options">...</span>
  </div>
</div>
  )
}

// Helper function to convert priority numbers to labels
const mapPriorityToLabel = (priority) => {
    switch (parseInt(priority, 10)) {
      case 4:
        return 'Urgent';
      case 3:
        return 'High';
      case 2:
        return 'Medium';
      case 1:
        return 'Low';
      case 0:
        return 'No Priority';
      default:
        return 'Unknown Priority';
    }
  };

export default GroupHeader
