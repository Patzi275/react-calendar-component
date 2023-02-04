import './Calendar.css';
import React, { useState } from 'react';


const tsec = 1000;
const tmin = tsec * 60;
const thour = tmin * 60;
const tday = thour * 24;
const tweek = tday * 7;

function getMonthName(number, abrev = false) {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const monthName = monthNames[number];
  return abrev ? monthName.slice(0, 3) : monthName;
}

function getDaysInMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function getInfo(year, month) {
  const firstMonthDate = new Date(year, month, 1);
  const nbPrevMonthDay= firstMonthDate.getDay();
  const nbCurrentMonthDay = getDaysInMonth(firstMonthDate);
  let nbNextMonthDay;
  let nbTotalDay = 42;
  const pt = nbPrevMonthDay + nbCurrentMonthDay;

  const firstDayTime = firstMonthDate.setTime(firstMonthDate.getTime() - tday * nbPrevMonthDay);
  
  if (pt <= 28)
    nbTotalDay = 28;
  else if (pt <= 35)
    nbTotalDay = 35;

  nbNextMonthDay = nbTotalDay - pt;

  return { firstDayTime, nbPrevMonthDay: nbPrevMonthDay-1, nbCurrentMonthDay, nbNextMonthDay: nbNextMonthDay+1, nbTotalDay };
}

/*
Props:
  - date : date mise en avant
*/
function Calendar(props) {
  let [date, setDate] = useState(props.date || new Date());
  let [displayedMonth, setDisplayedMonth] = useState(props.displayedMonth || date.getMonth()); 
  let [displayedYear, setDisplayedYear] = useState(props.displayedMonth || date.getFullYear()); 
  let [state, setState] = useState(getInfo(displayedYear, displayedMonth));
  /* { firstDayTime, nbPrevMonthDay, nbCurrentMonthDay, nbNextMonthDay, nbTotalDay }; */

  function handleNextMonth() {
    
    let ndate = new Date(date);
    ndate.setTime(ndate.getTime() + tday*getDaysInMonth(date));
    setDate(ndate);
  }

  function handlePrevMonth() {
    let ndate = new Date(date);
    ndate.setTime(ndate.getTime() - tday*getDaysInMonth(date));
    ndate.setTime(ndate.getTime() - tday*getDaysInMonth(date));
    setDate(ndate);
  }

  function calendarHeader() {
    return (<div className="calendar-header">
      <div className="month-year">
        <button>{getMonthName(displayedMonth)}</button>
        <button>{displayedYear}</button>
      </div>
      <div className="calendar-btn-list">
        <button>{"<"}</button>
        <button>o</button>
        <button>{">"}</button>
      </div>
    </div>);
  }

  function calendarBody() {
    let itDay = new Date(state.firstDayTime);
    itDay.nextDay = () => itDay.setTime(itDay.getTime() + tday);

    return (<div className="calendar-body">
      {
        Array.from({ length: state.nbPrevMonthDay }, function () {
          itDay.nextDay();
          return (<div className="unfocus-date">
            {itDay.getDate()}
          </div>);
        })
      }
      {
        Array.from({ length: state.nbCurrentMonthDay }, function () {
          itDay.nextDay();;
          return (<div>
            {itDay.getDate()}
          </div>);
        })
      }
      {
        Array.from({ length: state.nbNextMonthDay }, function () {
          itDay.nextDay();
          return (<div className="unfocus-date">
            {itDay.getDate()}
          </div>);
        })
      }
    </div>);
  }

  console.log(state);

  /*Array.from({length: getDaysInMonth(date)}, (_, index) => <div ></div>);*/

  return (
    <div className="calendar">
      {calendarHeader()}
      {calendarBody()}
    </div>
  );
}

export default Calendar;
