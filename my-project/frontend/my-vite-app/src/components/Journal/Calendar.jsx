import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './JournalPage.css';

const Calendar = ({ entries }) => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const history = useHistory();
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleMonthClick = (index) => {
    setSelectedMonth(index);
  };

  const handleDateClick = (date) => {
    history.push(`/journal-entry/${date}`);
  };

  const renderMonths = () => (
    <div className="calendar-months">
      {months.map((month, index) => (
        <div
          key={index}
          className="calendar-month"
          onClick={() => handleMonthClick(index)}
        >
          {month}
        </div>
      ))}
    </div>
  );

  const renderDates = (month) => {
    const daysInMonth = new Date(2024, month + 1, 0).getDate();
    const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
      <div className="calendar-dates">
        {dates.map((date) => {
          const mood = entries[`${2024}-${month + 1}-${date}`]?.mood || 'neutral';
          return (
            <div
              key={date}
              className={`calendar-date calendar-date-${mood}`}
              onClick={() => handleDateClick(`${2024}-${month + 1}-${date}`)}
            >
              {date}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="calendar">
      {selectedMonth === null ? renderMonths() : renderDates(selectedMonth)}
      {selectedMonth !== null && (
        <button onClick={() => setSelectedMonth(null)}>Back to Months</button>
      )}
    </div>
  );
};

export default Calendar;