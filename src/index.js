import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {store} from './store/store';
import {Provider} from 'react-redux';
import {fetchDataCars} from './store/reducer';
import { fetchUsdRateEveryTwoMinutes } from './store/reducer'

store.dispatch(fetchDataCars)
store.dispatch(fetchUsdRateEveryTwoMinutes)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
);

