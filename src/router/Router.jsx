
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
import Carla from '../components/pages/carla/Carla';
import Anahy from '../components/pages/anahy/Anahy';
import Dayana from '../components/pages/danaya/Dayana';
import Bleck from '../components/pages/bleck/bleck';
import Martita from '../components/pages/martita/Martita';

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
        
         {
          path: "/carla",
          element: <Carla/>,
        },
         {
          path: "/anahy",
          element: <Anahy/>,
        },
         {
          path: "/dayana",
          element: <Dayana/>,
        },
        {
          path: "/bleck",
          element: <Bleck/>,
        },
        {
          path: "/martita",
          element: <Martita/>,
        },
        
        
      ],
  }, {
    path: "/login",
    element: <Login />,
  },
]); export default router;