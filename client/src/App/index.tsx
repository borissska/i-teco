import React from 'react';
import { Routes, Route } from "react-router-dom";
import styles from "./App.module.scss";
import MainLayout from '../MainLayout';
import Tasks from '../pages/Tasks';
import OrderPage from '../pages/OrdersPage';
import EquipmentPage from '../pages/EquipmentPage';

const App: React.FC = () => {
  return (
    <div className={styles.body}>
      <Routes>
        <Route path='/' element={ <MainLayout /> }>
          <Route path='orders' element={ <OrderPage /> }/>
          <Route path='equipment' element={ <EquipmentPage /> } />
          <Route path='tasks' element={ <Tasks /> } />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
