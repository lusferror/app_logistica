import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Location from "../pages/location";

const AppRouter = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/location/:index',
        element: <Location />
    }
])

export default AppRouter;