import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Calendar from './Calendar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Calendar 
      date={new Date(2023, 1, 1)}
    />
  </React.StrictMode>
);
