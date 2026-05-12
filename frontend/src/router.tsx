import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import SetupPage from "./pages/SetupPage";
import SpinPage from "./pages/SpinPage";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        children: [
            {
                index: true,
                element: <Landing />
            },
            {
                path: "/setUp",
                element: <SetupPage />
            },
            {
                path: "play",
                element: <SpinPage />
            }
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
]);

export default router