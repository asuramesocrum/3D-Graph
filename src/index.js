import React from 'react';
import ReactDOM from 'react-dom/client';
import "./main.scss"
import MainComponent from "./components/mainComponent";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MainComponent />
  </React.StrictMode>
);
