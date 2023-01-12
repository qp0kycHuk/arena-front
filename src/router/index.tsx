import { AuthLayout } from "@layouts/AuthLayout";
import { MainLayout } from "@layouts/MainLayout";
import { Edit, Login, Projects, Registration } from "@pages/index";

import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: 'projects',
                element: <Projects />
            },
            {
                path: 'edit',
                element: <Edit />
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