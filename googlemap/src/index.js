import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'


ReactDOM.render(
  
    <BrowserRouter>
        <App />
    </BrowserRouter>,
  document.getElementById('root')
);

