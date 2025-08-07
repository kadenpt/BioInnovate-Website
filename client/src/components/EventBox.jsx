import { useState } from 'react';

export default function EventBox({name, date, time, location, description}) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #226897",
            width: "300px",
            height: "200px",
            padding: "1rem",
            margin: "1rem",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            backgroundColor: isHovered ? "#226897" : "white",
            transition: "all 0.3s ease",
            cursor: "pointer"
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
            <h1 style={{
              fontFamily: "quicksand, sans-serif",
              color: isHovered ? "white" : "#226897",
              fontSize: "1.5rem",
              textAlign: "center",
              transition: "color 0.3s ease"
            }}>{name}</h1>
            <p style={{
              fontFamily: "anton, sans-serif",
              color: isHovered ? "white" : "#226897",
              fontSize: "0.9rem",
              transition: "color 0.3s ease"
            }}>{date}</p>
            <p style={{
              fontFamily: "anton, sans-serif",
              color: isHovered ? "white" : "#226897",
              fontSize: "0.9rem",
              transition: "color 0.3s ease"
            }}>{time}</p>
            <p style={{
              fontFamily: "quicksand, sans-serif",
              fontSize: "0.8rem",
              color: isHovered ? "white" : "black",
              transition: "color 0.3s ease"
            }}>{location}</p>
            <p style={{
              fontFamily: "quicksand, sans-serif",
              fontSize: "0.8rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              textAlign: "center",
              lineHeight: "1.3",
              color: isHovered ? "white" : "black",
              transition: "color 0.3s ease"
            }}>{description}</p>
        </div>
    )
}