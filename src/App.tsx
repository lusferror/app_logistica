import { RouterProvider } from "react-router-dom";
import AppRouter from "./router/appRouter";

export default function App() {
    return (
        <RouterProvider router={AppRouter} />
    )
}