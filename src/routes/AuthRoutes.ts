import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const LoginPage = lazy(() => import("@/components/pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("@/components/pages/auth/RegisterPage"));

const AuthRoutes: RouteObject[] = [
  {
    path: "login",
    Component: LoginPage
  },
  {
    path: "register",
    Component: RegisterPage
  }
];

export default AuthRoutes;
