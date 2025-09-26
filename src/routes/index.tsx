import { createBrowserRouter } from "react-router";
import HomeScreen from "../features/home";
import DetailScreen from "../features/detail";
import Layout from "../components/layout";
import ProtectedRoutes from "./ProtectedRoutes";
import Auth from "../features/auth";
import ProductScreen from "../features/product";

export const routes = createBrowserRouter([
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/login",
        element: <Auth />,
      },
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            element: <HomeScreen />,
            index: true,
          },
          {
            element: <DetailScreen />,
            path: "/detail/:id",
          },
          {
            element: <ProductScreen />,
            path: "/product",
          },
        ],
      },
    ],
  },
]);
