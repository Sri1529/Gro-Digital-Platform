import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import store from './store/reducer';
import { setAuthToken } from './store/service';

const savedToken = localStorage.getItem("accessToken");
if (savedToken) {
  setAuthToken(savedToken);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <Provider store={store}>
     <BrowserRouter>
       <App />
     </BrowserRouter>
   </Provider>
);

reportWebVitals();
