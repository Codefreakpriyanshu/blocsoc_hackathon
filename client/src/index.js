import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import Main from './Main';
import About from './About';
import VerifyOwner from './VerifyOwner';
import UploadPage from './pages/UploadPage';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/marketplace",
    element: <Main/>
  },
  {
    path: "/about",
    element: <About/>
  },
  {
    path: "/verify-ownership",
    element: <VerifyOwner/>
  },
  {
    path: "/UploadYourMusic",
    element: <UploadPage/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
