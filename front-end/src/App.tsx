
import './App.css';

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import Ethereum from "./Ethereum";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Ethereum />,
  },
]);

function App() {
  return (<RouterProvider router={router} />);
}

export default App;
