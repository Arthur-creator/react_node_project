import React, {lazy, createElement} from "react";
import Home from "../views/Home";
import Chat from "../views/Chat";


const routes = [
    {
        name: 'home',
        path: '/',
        component: () => <Home/>,
        meta: {},
    },
    {
      name: 'chat',
      path: '/chat',
      component: () => <Chat/>,
      meta: {}
    },
    {
        name: 'notFound',
        path: '*',
        component: lazy(() => import('../views/NotFound.jsx')),
        meta: {},
    },
];

export default routes;