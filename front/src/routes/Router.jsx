import {Route, Routes} from 'react-router-dom';
import {Suspense} from 'react';
import {SCOPES} from '../utils/permissions-map';
import Home from "../views/Home";
import NotFound from "../views/NotFound";
import RouterView from "./RouterView";
import Login from "../views/Login";
import Chat from "../views/Chat" ;
import Admin from "../views/Admin/Admin";
import {EditAccount} from "../components/utils/EditAccount";

//hook that return a list of routes
export const useRoutes = () => {
    const routes = [
        {
            name: 'home',
            path: '/',
            element:
                <RouterView>
                    <Home title="Home"/>
                </RouterView>,
        },
        {
            name: 'login',
            path: '/login',
            element:
                <RouterView>
                    <Login/>
                </RouterView>,
        },
        {
            name: 'chat',
            path: '/chat',
            element:
                <RouterView>
                    <Chat/>
                </RouterView>
        },
        {
            name: 'notFound',
            path: '*',
            element: <NotFound/>,
        },
        {
            name: 'admin',
            path: '/admin',
            element:
                <RouterView>
                    <Admin/>
                </RouterView>
        },
        {
            name: 'userEdit',
            path: '/users/:userId',
            element:
                <RouterView>
                    <EditAccount/>
                </RouterView>
        },
    ];
    return routes.map((route) => {
        return <Route key={route.name} {...route}/>;
    });
}


export default function Router() {
    const routes = useRoutes();
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                {routes.map(route => route)}
            </Routes>
        </Suspense>
    )
}