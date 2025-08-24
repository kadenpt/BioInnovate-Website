import { useState } from 'react';

export default function Calendar({ events = [] }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Check if a specific day has events
  const getEventsForDay = (day) => {
    if (!day) return [];
    
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const dayDate = new Date(currentYear, currentMonth, day);
    
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === day && 
             eventDate.getMonth() === currentMonth && 
             eventDate.getFullYear() === currentYear;
    });
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div style={{
      width: "100%",
      maxWidth: "800px",
      margin: "2rem auto",
      padding: "1rem",
      backgroundColor: "white",
      borderRadius: "12px",
      boxShadow: "0 8px 25px rgba(0,0,0,0.15), 0 4px 10px rgba(0,0,0,0.1)"
    }}>
      {/* Month Navigation */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1.5rem"
      }}>
        <button 
          onClick={goToPreviousMonth}
          style={{
            background: "none",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
            color: "#226897",
            padding: "0.5rem"
          }}
        >
          ‹
        </button>
        <h2 style={{
          fontFamily: "Anton, sans-serif",
          color: "#226897",
          fontSize: "1.8rem",
          margin: 0
        }}>
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <button 
          onClick={goToNextMonth}
          style={{
            background: "none",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
            color: "#226897",
            padding: "0.5rem"
          }}
        >
          ›
        </button>
      </div>

      {/* Days of Week Header */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: "4px",
        marginBottom: "8px"
      }}>
        {daysOfWeek.map(day => (
          <div key={day} style={{
            textAlign: "center",
            padding: "0.5rem",
            fontFamily: "Quicksand, sans-serif",
            fontWeight: "bold",
            color: "#226897",
            fontSize: "0.9rem"
          }}>
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: "4px"
      }}>
        {days.map((day, index) => {
          const dayEvents = getEventsForDay(day);
          const hasEvents = dayEvents.length > 0;
          
          return (
            <div 
              key={index}
              style={{
                aspectRatio: "1",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                fontFamily: "Quicksand, sans-serif",
                fontSize: "0.9rem",
                color: day ? "#333" : "transparent",
                backgroundColor: day ? (hasEvents ? "#e3f2fd" : "#f8f9fa") : "transparent",
                borderRadius: "4px",
                cursor: day ? "pointer" : "default",
                border: day ? `1px solid ${hasEvents ? "#226897" : "#e9ecef"}` : "none",
                position: "relative",
                padding: "4px",
                overflow: "hidden"
              }}
              onMouseEnter={(e) => {
                if (day) {
                  e.target.style.backgroundColor = hasEvents ? "#bbdefb" : "#e3f2fd";
                }
              }}
              onMouseLeave={(e) => {
                if (day) {
                  e.target.style.backgroundColor = hasEvents ? "#e3f2fd" : "#f8f9fa";
                }
              }}
            >
              <span style={{ 
                marginBottom: "4px", 
                fontWeight: "bold",
                fontSize: "1rem"
              }}>
                {day}
              </span>
              
              {hasEvents && (
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2px",
                  width: "100%",
                  alignItems: "center"
                }}>
                  {dayEvents.slice(0, 2).map((event, eventIndex) => (
                    <div
                      key={eventIndex}
                      style={{
                        backgroundColor: "#226897",
                        color: "white",
                        padding: "2px 4px",
                        borderRadius: "3px",
                        fontSize: "0.7rem",
                        fontFamily: "Quicksand, sans-serif",
                        fontWeight: "500",
                        textAlign: "center",
                        width: "90%",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        lineHeight: "1.2"
                      }}
                      title={`${event.name} at ${event.time}`}
                    >
                      {event.name}
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div style={{
                      backgroundColor: "#226897",
                      color: "white",
                      padding: "2px 4px",
                      borderRadius: "3px",
                      fontSize: "0.7rem",
                      fontFamily: "Quicksand, sans-serif",
                      fontWeight: "500",
                      textAlign: "center",
                      width: "90%"
                    }}>
                      +{dayEvents.length - 2} more
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
} 