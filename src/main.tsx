import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Matte1 } from './Matte1';
import { WordPlay1 } from './WordPlay1';
import { Menu } from './Menu';
import { Multiplication1 } from './Multiplication1';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Matte1 />,
  },
  {
    path: "wordplay1/",
    element: <WordPlay1 />,
  },
  {
    path: "multiplication1/",
    element: <Multiplication1 />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Menu />
    <RouterProvider router={router} />
  </React.StrictMode>,
);
