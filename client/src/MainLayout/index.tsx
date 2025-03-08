import React from "react";
import { Outlet } from "react-router-dom";
import Menu from "../components/Menu/Menu";
import styles from "./MainLayout.module.scss";

const MainLayout: React.FC = () => {
  return (
    <div className={styles.main}>
      <div className={styles.main__sidebar}>
        <Menu />
      </div>
      <div className={styles.main__main}>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
