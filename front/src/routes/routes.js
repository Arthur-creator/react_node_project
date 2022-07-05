import React, {lazy, createElement} from "react";
import Home from "../views/Home";


const routes = [
    {
        name: 'home',
        path: '/',
        component: () => <Home/>,
        meta: {},
    },
    {
        name: 'notFound',
        path: '*',
        component: lazy(() => import('../views/NotFound.jsx')),
        meta: {},
    },
];

export default routes;