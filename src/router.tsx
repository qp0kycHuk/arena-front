import { RouteObject, createBrowserRouter } from "react-router-dom";
import { ArticleEditPage, ArticleViewPage, ArticleListPage, Home, Login, Projects, Registration } from "@pages/index";
import { AuthLayout } from "@layouts/AuthLayout";
import { MainLayout } from "@layouts/MainLayout";


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
                element: <ArticleListPage />,
            },
            {
                path: 'articles/:id',
                element: <ArticleViewPage />,
            },
            {
                path: 'articles/create/',
                element: <ArticleEditPage />,
            },
            {
                path: 'articles/edit/:id',
                element: <ArticleEditPage />,
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