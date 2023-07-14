import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import Home from './Home';
import Main from './Main';
import About from './About';
import VerifyOwner from './VerifyOwner';
import UploadPage from './backend/UploadPage';
import reportWebVitals from './reportWebVitals';
import { ThirdwebProvider } from "@thirdweb-dev/react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const activeChain = "ethereum";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
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
]);


const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <ThirdwebProvider activeChain={activeChain}>
      <RouterProvider router = {router}/>
    </ThirdwebProvider>
  </React.StrictMode>
);


reportWebVitals();
