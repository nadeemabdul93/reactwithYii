import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import PageNotFound from "../components/PageNotFound";
import Home from "../components/Home";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import PublicLayout from "../layout/PublicLayout";
import DashboardLayout from "../layout/DashboardLayout";
const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/site/dashboard" element={<DashboardLayout />}>
            <Route element={<Navigate to="/site/dashboard" />} index />
            <Route element={"this is private route"} path="/site/dashboard" />
          </Route>
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/site" element={<PublicLayout />}>
            <Route element={<Navigate to="/site" />} index />

            <Route path="/site"  element={<Home />} />
            <Route path="/site/login" element={<Login />} />
            <Route path="/site/register" element={<Register />} />
          </Route>
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
