import './Calendar.css';
import React, { useState, useEffect } from 'react';
import { Day, HDay } from './Day';
import './Selector';
import Selector from './Selector';

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
  const nbCurrentMonthDay = getDaysInMonth(firstMonthDate);
  let nbPrevMonthDay= firstMonthDate.getDay();
  if (nbPrevMonthDay == 0) 
    nbPrevMonthDay = 6;
  else
    nbPrevMonthDay--;

  let nbNextMonthDay;
  let nbTotalDay = 42;
  const pt = nbPrevMonthDay + nbCurrentMonthDay;

  const firstDayTime = firstMonthDate.setTime(firstMonthDate.getTime() - tday * (nbPrevMonthDay + 1));
  
  if (pt <= 28)
    nbTotalDay = 28;
  else if (pt <= 35)
    nbTotalDay = 35;

  nbNextMonthDay = (nbTotalDay - pt) % 7; //Exp 

  return { firstDayTime, nbPrevMonthDay: nbPrevMonthDay, nbCurrentMonthDay, nbNextMonthDay: nbNextMonthDay, nbTotalDay };
}

function Calendar(props) {
  let [date, setDate] = useState(props.date || new Date());
  let [displayedMonth, setDisplayedMonth] = useState(props.displayedMonth || date.getMonth()); 
  let [displayedYear, setDisplayedYear] = useState(props.displayedMonth || date.getFullYear()); 
  let [state, setState] = useState(getInfo(displayedYear, displayedMonth));
  /* { firstDayTime, nbPrevMonthDay, nbCurrentMonthDay, nbNextMonthDay, nbTotalDay }; */

  useEffect(function () {
    setState(getInfo(displayedYear, displayedMonth));
  }, [displayedMonth, displayedYear]);

  function handleNextMonth() {
    let monthNum = displayedMonth;
    let yearNum = displayedYear;

    ++monthNum;
    if (monthNum >= 12) {
      monthNum = 0;
      ++yearNum;
    }

    setDisplayedMonth(monthNum);
    setDisplayedYear(yearNum);
  }

  function handlePrevMonth() {
    let monthNum = displayedMonth;
    let yearNum = displayedYear;

    --monthNum;
    if (monthNum < 0) {
      monthNum = 11;
      --yearNum;
    }

    setDisplayedMonth(monthNum);
    setDisplayedYear(yearNum);
  }

  function handleChangeMonth(month) {
    setDisplayedMonth(month);
  }

  function handleChangeYear(year) {
    setDisplayedYear(year);
  }

  function calendarHeader() {
    let currentYear = date.getFullYear();

    return (<div className="calendar-header">
      <div className="month-year">
        <Selector 
          elements={Array.from({length: 12}, (_, index) => ({label: getMonthName(index), value: index}))}
          selected={displayedMonth}
          onChange={handleChangeMonth}
        />
        <Selector 
          elements={Array.from({length: 11}, (_, index) => ({label: currentYear - 1 + index, value: currentYear - 1 + index}))}
          selected={displayedYear}
          onChange={handleChangeYear}
        />
      </div>
      <div className="calendar-btn-list">
        <button onClick={handlePrevMonth}>{"<"}</button>
        <button onClick={handleNextMonth}>{">"}</button>
      </div>
    </div>);
  }

  function calendarBody() {
    let itDay = new Date(state.firstDayTime);
    itDay.nextDay = () => itDay.setTime(itDay.getTime() + tday);

    return (<div className="calendar-body">
      {
        ['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((element, index) => <div className='day-name' key={index}>{ element }</div>)
      }
      {
        Array.from({ length: state.nbPrevMonthDay }, function (_, index) {
          itDay.nextDay();
          return <HDay key={index}>{itDay.getDate()}</HDay>;
        })
      }
      {
        Array.from({ length: state.nbCurrentMonthDay }, function (_, index) {
          itDay.nextDay();
          if (itDay.toLocaleDateString() === date.toLocaleDateString())
            return <Day key={index} className='current-day'>{itDay.getDate()}</Day>;
          return <Day key={index}>{itDay.getDate()}</Day>;
        })
      }
      {
        Array.from({ length: state.nbNextMonthDay }, function (_, index) {
          itDay.nextDay();
          return <HDay key={index}>{itDay.getDate()}</HDay>;
        })
      }
    </div>);
  }

  /*Array.from({length: getDaysInMonth(date)}, (_, index) => <div ></div>);*/

  return (
    <div className="calendar">
      {calendarHeader()}
      {calendarBody()}
    </div>
  );
}

export default Calendar;
