import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import Home from './HomePage.jsx'
import Shopping from './ShoppingPage.jsx'
import ErrorPage from './ErrorPage.jsx';
import MainContents from './MainContents.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "shopping",
        element: <Shopping />,
      },
      {
        path: '/',
        element: <MainContents />
      }
    ]
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
