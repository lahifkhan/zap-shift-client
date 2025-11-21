import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import AuthLayout from "../Layouts/AuthLayout";
import LogIn from "../Pages/Auth/LogIn/LogIn";
import Register from "../Pages/Auth/Register/Register";
import PrivateRoutes from "./PrivateRoutes";
import Services from "../Pages/Services/Services";
import Parcels from "../Pages/Parcels/Parcels";
import DashboardLayout from "../Layouts/DashboardLayout";
import Myparcels from "../Pages/Dashboard/Myparcels/Myparcels";
import Payment from "../Pages/Dashboard/Myparcels/Payment/Payment";
import PaymentSuccess from "../Pages/Dashboard/Myparcels/Payment/PaymentSuccess";
import PaymentCancel from "../Pages/Dashboard/Myparcels/Payment/PaymentCancel";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/coverage",
        Component: Coverage,
      },
      {
        path: "/services",
        element: (
          <PrivateRoutes>
            <Services></Services>
          </PrivateRoutes>
        ),
      },

      {
        path: "/parcels",
        element: (
          <PrivateRoutes>
            <Parcels></Parcels>
          </PrivateRoutes>
        ),
      },
    ],
  },

  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: LogIn,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashboardLayout></DashboardLayout>
      </PrivateRoutes>
    ),
    children: [
      {
        path: "myParcels",
        Component: Myparcels,
      },

      {
        path: "payment/:parcelId",
        Component: Payment,
      },

      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancelled",
        Component: PaymentCancel,
      },
    ],
  },
]);
