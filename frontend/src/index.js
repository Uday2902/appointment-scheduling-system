import "@fortawesome/fontawesome-free/css/all.min.css";
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './index.css';
import './assets/static/FormStyles.css'
import store from "./store/store";
import {Provider} from 'react-redux'

// import dotenv from 'dotenv'

// dotenv.config();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  // <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  // </React.StrictMode>
);

