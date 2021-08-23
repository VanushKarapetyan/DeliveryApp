import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

window.onload = function () {
  document.getElementById("preloader").classList.add("preloader_block")
  setTimeout(() => {
  document.getElementById("preloader").classList.remove("preloader_block")
  }, 2500);
}
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

