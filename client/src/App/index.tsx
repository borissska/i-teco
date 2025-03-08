import React from 'react';
import { Routes, Route } from "react-router-dom";
import styles from "./App.module.scss";
import EquipmentList from '../pages/equipment/EquipmentList';
import OrderList from '../pages/orders/OrderList';
import MainLayout from '../MainLayout';
import Tasks from '../pages/Tasks';

const App: React.FC = () => {
  return (
    <div className={styles.body}>
      <Routes>
        <Route path='/' element={ <MainLayout /> }>
          <Route path='orders' element={ <OrderList /> }/>
          <Route path='equipment' element={ <EquipmentList /> } />
          <Route path='tasks' element={ <Tasks /> } />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
