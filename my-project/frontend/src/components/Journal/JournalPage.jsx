import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './customCalendar.css';
import { getJournalEntries } from './journalService';  // Import the API service

const localizer = momentLocalizer(moment);

const JournalPage = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const journalEntries = await getJournalEntries();
        const formattedEvents = journalEntries.map((entry) => ({
          title: entry.mood,
          start: new Date(entry.date),
          end: new Date(entry.date),
          allDay: true,
          color: getMoodColor(entry.mood),  // You can define this function to return colors based on mood
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error('Failed to fetch journal entries:', error);
      }
    };

    fetchEntries();
  }, []);

  const handleDayClick = (date) => {
    navigate(`/journal-entry/${moment(date).format('YYYY-MM-DD')}`);
  };

  const eventStyleGetter = (event) => {
    const style = {
      backgroundColor: event.color,
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block',
    };
    return { style };
  };

  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 400, width: '80%', margin: 'auto', marginTop: '100px', marginBottom: '20px' }}
        eventPropGetter={eventStyleGetter}
        views={['month', 'day']}
        selectable={true}
        onSelectSlot={(slotInfo) => handleDayClick(slotInfo.start)}
      />
    </div>
  );
};

const getMoodColor = (mood) => {
  switch (mood) {
    case 'happy':
      return 'green';
    case 'sad':
      return 'blue';
    case 'neutral':
      return 'gray';
    case 'angry':
      return 'red';
    case 'anxious':
      return 'orange';
    case 'tired':
      return 'purple';
    default:
      return 'gray';
  }
};

export default JournalPage;
