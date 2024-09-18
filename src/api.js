export const fetchTickets = async () => {
  // console.log(1);
  try {
    const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    return { "tickets": [], "users": [] };
  }
  };
  