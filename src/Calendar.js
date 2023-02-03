import './Calendar.css';
import React,  { useEffect, useRef, useState } from 'react';


const tsec = 1000;
const tmin = tsec*60;
const thour = tmin*60;
const tday = thour*24;
const tweek = tday*7;

function getMonthName(number, abrev = false) {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const monthName = monthNames[number];
  return abrev ? monthName.slice(0, 3) : monthName;
}

function getDaysInMonth(date) {
  return new Date(date.getFullYear(), date.getUTCMonth() + 1, 0).getUTCDate();
}

/*
Props:
  - date : date mise en avant
*/
function Calendar(props) {
  let [date, setDate] = useState(props.date || new Date());
  
  const firstMonthDate = new Date(date);
  const firstMonthDateDay = firstMonthDate.getUTCDay();
  const startDay = firstMonthDate.setTime(firstMonthDate.getTime() - tday * firstMonthDateDay);
    
  let t = firstMonthDateDay + getDaysInMonth(date);
  let totalNbDay = 42; 
  if (t <= 28) totalNbDay = 28;
  else if (t <= 35) totalNbDay = 35;
    
  let itDay = new Date(firstMonthDate);

  /*Array.from({length: getDaysInMonth(date)}, (_, index) => <div ></div>);*/

  return (
    <div className="calendar">
      <div className="calendar-header">
        <div className="month-year">
          <button>{ getMonthName(date.getMonth()) }</button>
          <button>{ date.getFullYear() }</button>
        </div>
        <div className="calendar-btn-list">
          <button>{ "<" }</button>
          <button>o</button>
          <button>{ ">" }</button>
        </div>
      </div>
      <div className="calendar-body">
        {
          Array.from({length: totalNbDay}, function () {
            itDay.setTime(itDay.getTime() + tday);
            return <div>{ itDay.getUTCDate() }</div>;
          })
        }
      </div>
    </div>
  );
}

export default Calendar;
