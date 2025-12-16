import { createBrowserRouter } from "react-router";
import AppLayout from "./components/layouts/AppLayout";
import Index from "./pages/index/Index";
import Pay from "./pages/pay/Pay";
import Success from "./pages/pay/Success";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "/pay",
        element: <Pay />,
      },
      {
        path: "/pay/success",
        element: <Success />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
