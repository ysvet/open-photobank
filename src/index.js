import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createStore, combineReducers} from 'redux';
import { Provider } from 'react-redux';
import switchLang from './store/reducers/switchLang';
import * as serviceWorker from './serviceWorker';


const rootReducer = combineReducers({
    lng: switchLang
});

const store = createStore(rootReducer);


const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
