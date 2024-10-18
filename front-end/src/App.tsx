
import './App.css';

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { Minting, TransferFund, Ethereum, Main } from './pages';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/wallet",
    element: <Ethereum />,
  },
  {
    path: "/minting",
    element: <Minting />,
  },
  {
    path: "/transfer-fund",
    element: <TransferFund />,
  },
]);

function App() {
  return (<RouterProvider router={router} />);
}

export default App;
