import * as React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import LoginPage from '../pages/login';
import TodoListPage from '../pages/todo-list';
import PrivateRoute from '../shared/private-route/PrivateRoute';
type RouteInfo = {
    path: string;
    name: string;
    component: React.FC;
    exact?: boolean;
    needsAuth?: boolean;
}


const Routes: Array<RouteInfo> = [
    {
        path: '/',
        name: 'Login',
        component: LoginPage,
        exact: true,
    },
    {
        path: '/todo',
        name: 'Todo List',
        component: TodoListPage,
        exact: true,
        needsAuth: true,
    }
];

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                {
                    Routes.filter(r => !r.needsAuth).map(r => (
                        <Route key={r.name} {...r} />
                    ))
                }

                {
                    Routes.filter(r => r.needsAuth).map(r => (
                        <PrivateRoute key={r.name} authPath="/" {...r} />
                    ))
                }
                <Redirect from="*" to="/" exact />

            </Switch>
        </BrowserRouter>
    )
};

export default Router;
