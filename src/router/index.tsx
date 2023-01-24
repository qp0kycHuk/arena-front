import { AuthLayout } from "@layouts/AuthLayout";
import { MainLayout } from "@layouts/MainLayout";
import { Edit, Home, Login, Projects, Registration } from "@pages/index";

import { createBrowserRouter } from "react-router-dom";

export const routesPath = {

}

export const router = createBrowserRouter([
    // {
    //     path: "/",
    //     element: <Home />
    // },
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: 'projects/',
                element: <Projects />
            },
            {
                path: 'articles/',
                element: <Projects />,
            },
            {
                path: 'articles/create/',
                element: <Edit />,
            },
            {
                path: 'articles/edit/:id',
                
                element: <Edit />,
            },

        ]
    },
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'registration',
                element: <Registration />
            },
        ]
    },

])