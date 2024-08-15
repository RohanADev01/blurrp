export function roundToNearestHalf (num) {
  return Math.round(num * 2) / 2;
}
export function getReorderedDaysOfWeek () {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Get the current day of the week (e.g., 'Thu')
  const currentDate = new Date();
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDay = dayNames[currentDate.getDay()];

  // Function to reorder the list so that it ends with the current day
  const currentIndex = days.indexOf(currentDay);
  if (currentIndex === -1) {
    throw new Error('Current day is not in the list');
  }

  // Reorder the array
  const reorderedDays = days.slice(currentIndex + 1).concat(days.slice(0, currentIndex + 1));
  return reorderedDays;
}

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Helper function to format the date for getCurrentDisplayDate()
function formatDate (date) {
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  // Determine suffix for the day (st, nd, rd, th)
  let suffix;
  if (day % 10 === 1 && day % 100 !== 11) suffix = 'st';
  else if (day % 10 === 2 && day % 100 !== 12) suffix = 'nd';
  else if (day % 10 === 3 && day % 100 !== 13) suffix = 'rd';
  else suffix = 'th';

  return `${day}${suffix} ${month} ${year}`;
}

// Helper function to format date ranges for getCurrentDisplayDate()
function formatDateRange (startDate, endDate) {
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
}

export function getCurrentDisplayDate (selectedOption) {
  const d = new Date();

  // Get today's date
  const today = d;

  if (selectedOption === 0) {
    return formatDate(today);
  } else if (selectedOption === 1) {
    // Get the current day and date from 7 days ago
    var date = new Date();
    var day = date.getDate() - 7;
    date.setDate(day);

    return formatDateRange(date, today);
  } else if (selectedOption === 2) {
    // Get the current day and date from 30 days ago
    var date = new Date();
    var day = date.getDate() - 30;
    date.setDate(day);

    return formatDateRange(date, today);
  }
}

export function getPast30DaysEveryXNumbers (interval = 2) {
  const today = new Date();
  const days = [];

  // Loop through every 2nd day, starting from today
  for (let i = 0; i < 32; i += interval) {
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - i);

    // Extract the day number
    const day = pastDate.getDate();
    days.push(String(day).padStart(2, '0'));
  }

  // Reverse the array to have the current day number at the end
  return days.reverse();
}