import { AuthLayout } from "@layouts/AuthLayout";
import { MainLayout } from "@layouts/MainLayout";
import { ArticleEdit, ArticleView, ArticleList, Home, Login, Projects, Registration } from "@pages/index";

import { RouteObject, createBrowserRouter } from "react-router-dom";

export const routesPath = {}

const config: RouteObject[] = [
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
                element: <ArticleList />,
            },
            {
                path: 'articles/:id',
                element: <ArticleView />,
            },
            {
                path: 'articles/create/',
                element: <ArticleEdit />,
            },
            {
                path: 'articles/edit/:id',

                element: <ArticleEdit />,
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
]

export const router = createBrowserRouter(config)