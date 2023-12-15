import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MyComponent from './App';
import reportWebVitals from './reportWebVitals';


  // fetch('http://localhost:3000/api/v1/current.json?key=b43b5f84d6e540ca853162955232710&q=Jordan')
  // .then(response => {
  //   if (!response.ok) {
  //     throw new Error(`HTTP error! Status: ${response.status}`);
  //   }
  //   else{
  //   console.log(response.json());}
  // })
  // .then(data => console.log(data))
  // .catch(error => console.error('Error fetching data:', error));


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MyComponent/> 
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
