import React from 'react';
import './HexagonProfile.css';

export default function HexagonProfile({ name, jobTitle, imageSrc }) {
  return (
    <div className="profile-container">
      <div className="hexagon">
        <img src={imageSrc} alt={name} className="hexagon-image" />
      </div>
      <div className="profile-name">
        <div>{name}</div>
        <div className="job-title">{jobTitle}</div>
      </div>
    </div>
  );
}
