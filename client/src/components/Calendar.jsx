import { useState } from 'react';

export default function Calendar() {
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
        {days.map((day, index) => (
          <div 
            key={index}
            style={{
              aspectRatio: "1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Quicksand, sans-serif",
              fontSize: "0.9rem",
              color: day ? "#333" : "transparent",
              backgroundColor: day ? "#f8f9fa" : "transparent",
              borderRadius: "4px",
              cursor: day ? "pointer" : "default",
              border: day ? "1px solid #e9ecef" : "none"
            }}
            onMouseEnter={(e) => {
              if (day) {
                e.target.style.backgroundColor = "#e3f2fd";
              }
            }}
            onMouseLeave={(e) => {
              if (day) {
                e.target.style.backgroundColor = "#f8f9fa";
              }
            }}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
} 