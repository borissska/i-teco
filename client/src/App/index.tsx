import React from "react";
import { Routes, Route } from "react-router-dom";
import styles from "./App.module.scss";
import MainLayout from "../MainLayout";

const OrderPage = React.lazy(() => import(/* webpackChunkName: "Orders" */ "../pages/OrdersPage"));
const EquipmentPage = React.lazy(
  () => import(/* webpackChunkName: "Equipment" */ "../pages/EquipmentPage")
);
const Tasks = React.lazy(() => import(/* webpackChunkName: "Tasks" */ "../pages/Tasks"));

const App: React.FC = () => {
  return (
    <div className={styles.body}>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route
            path='orders'
            element={
              <React.Suspense fallback={<>Идет загрузка!</>}>
                <OrderPage />
              </React.Suspense>
            }
          />
          <Route
            path='equipment'
            element={
              <React.Suspense fallback={<>Идет загрузка!</>}>
                <EquipmentPage />
              </React.Suspense>
            }
          />
          <Route
            path='tasks'
            element={
              <React.Suspense fallback={<>Идет загрузка!</>}>
                <Tasks />
              </React.Suspense>
            }
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
