import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';



const store = createStore(reducers, compose(applyMiddleware(thunk)));


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>  
);




// If you want your app to work faster offline and load faster, you can change unregister() to register() below. Note, this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA.
serviceWorkerRegistration.register();

