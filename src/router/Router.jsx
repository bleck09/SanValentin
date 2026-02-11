
import React from 'react'; import { createHashRouter } from "react-router-dom"; // 👈 cambia aquí 
import Error404 from "../components/pages/error404/Error404";
import Products from '../components/pages/productos/Products';
import Albun from '../components/pages/albun/Albun';
import Maria from '../components/pages/maria/Maria';
import Sofia from '../components/pages/sofia/Sofia';
import App from '../components/templates/App';
import Home from '../components/pages/home/Home';
import Login from '../components/pages/login/Login';
import Martha from '../components/pages/martha/Martha';
const router = createHashRouter([ // 👈 también aquí 
  {
    path: "/",
    element: <App />,
    errorElement: <Error404 />,
    children:
      [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/productos",
          element: <Products />,
        }, 
        {
          path: "/albun",
          element: <Albun />,
        },
          {
          path: "/maria",
          element: <Maria/>,
        },
        {
          path: "/sofia",
          element: <Sofia/>,
        },
         {
          path: "/martha",
          element: <Martha/>,
        },
        
      ],
  }, {
    path: "/login",
    element: <Login />,
  },
]); export default router;