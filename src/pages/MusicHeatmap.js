import React, { useEffect, useState } from 'react';
import './MusicHeatmap.css';

const MusicHeatmap = () => {
  const [data, setData] = useState(null);
  const [tooltip, setTooltip] = useState({ visible: false, content: '', x: 0, y: 0 });

  useEffect(() => {
    fetch("music_data_2023.json")
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error("Error loading JSON:", error));
  }, []);

  const handleMouseOver = (e, dayData, month, day, year) => {
    setTooltip({
      visible: true,
      content: `Date: ${month}/${day}/${year}\nTotal Songs: ${dayData.totalSongs}\nMost Played: ${dayData.mostPlayedSong}\nDuration: ${dayData.totalDuration} mins`,
      x: e.pageX + 10,
      y: e.pageY + 10,
    });
  };

  const handleMouseOut = () => {
    setTooltip({ visible: false, content: '', x: 0, y: 0 });
  };

  if (!data) return <div>Loading...</div>;

  const { year, data: monthsData } = data;
  const orderedMonths = Object.keys(monthsData).sort((a, b) => parseInt(a) - parseInt(b));

  return (
    <div className="heatmap-container">
      <h1>My Year in Music - {year}</h1>
      <div className="months-grid">
        {orderedMonths.map((month) => {
          const days = monthsData[month];
          const firstDayOfMonth = new Date(year, parseInt(month) - 1, 1).getDay();
          const orderedDays = Object.keys(days).sort((a, b) => parseInt(a) - parseInt(b));

          return (
            <div className="month" key={month}>
              <div className="month-name">
                {new Date(year, parseInt(month) - 1).toLocaleString('default', { month: 'long' })}
              </div>
              <div className="days">
                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                  <div key={`empty-${i}`} className="day empty-day" />
                ))}
                {orderedDays.map((day) => {
                  const dayData = days[day];
                  const { totalSongs } = dayData;
                  let intensityLevel = '';

                  if (totalSongs < 10) intensityLevel = 'level1';
                  else if (totalSongs < 20) intensityLevel = 'level2';
                  else if (totalSongs < 30) intensityLevel = 'level3';
                  else if (totalSongs < 40) intensityLevel = 'level4';
                  else intensityLevel = 'level5';

                  return (
                    <div
                      key={day}
                      className="day"
                      data-songs={intensityLevel}
                      onMouseOver={(e) => handleMouseOver(e, dayData, month, day, year)}
                      onMouseOut={handleMouseOut}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      {tooltip.visible && (
        <div
          className="tooltip"
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            display: 'block',
          }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
};

export default MusicHeatmap;
