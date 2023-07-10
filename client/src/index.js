import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import Main from './Main';
import About from './About';
import VerifyOwner from './VerifyOwner';
import UploadPage from './pages/UploadPage';
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


const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <ThirdwebProvider activeChain={activeChain}>
      <RouterProvider router = {router}/>
    </ThirdwebProvider>
  </React.StrictMode>
);



// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
