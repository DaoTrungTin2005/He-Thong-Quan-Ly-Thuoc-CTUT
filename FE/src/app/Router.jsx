import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login";
import Account from "../pages/Account";
import MainLayout from "../layouts/MainLayout";
import CreateAccount from "../pages/CreateAccount.jsx";
import UpdateAccount from "../pages/UpdateAccount.jsx";
import Personal from "../pages/Personal.jsx";
import Medicine from "../pages/Medicine.jsx";
import MedicineExport from "../pages/MedicineExport.jsx";
import CreateMedicine from "../pages/CreateMedicine.jsx";
import UpdateMedicine from "../pages/UpdateMedicine.jsx";
import MedicineReport from "../pages/MedicineReport.jsx";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route
          path="/login"
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />
        {/* Main layout */}
        <Route element={<MainLayout />}>
          <Route path="/account" element={<Account />} />
        </Route>
        <Route element={<MainLayout hideHeader={false} />}>
          <Route path="/account/create" element={<CreateAccount />} />
        </Route>
        <Route element={<MainLayout hideHeader={false} />}>
          <Route path="/account/update" element={<UpdateAccount />} />
        </Route>
        <Route
          element={
            <MainLayout hideHeader={false} title="Quản Lí Thông Tin Cá Nhân" />
          }
        >
          <Route path="/personal" element={<Personal />} />
        </Route>
        <Route element={<MainLayout hideHeader={true} title="Quản Lí Thuốc" />}>
          <Route path="/medicine" element={<Medicine />} />
        </Route>
        <Route
          element={<MainLayout hideHeader={false} title="Quản Lí Thuốc" />}
        >
          <Route path="/medicine/export" element={<MedicineExport />} />
        </Route>
        <Route
          element={<MainLayout hideHeader={false} title="Quản Lí Thuốc" />}
        >
          <Route path="/medicine/create" element={<CreateMedicine />} />
        </Route>
        <Route
          element={<MainLayout hideHeader={false} title="Quản Lí Thuốc" />}
        >
          <Route path="/medicine/update" element={<UpdateMedicine />} />
        </Route>
        <Route
          element={<MainLayout hideHeader={false} title="Quản Lí Thuốc" />}
        >
          <Route path="/medicine/report" element={<MedicineReport />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
