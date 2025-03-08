import React from 'react'
import { useNavigate } from 'react-router-dom';
import styles from "./MenuEl.module.scss";

interface IMenuEl {
    name: React.ReactNode;
}

const MenuEl: React.FC<IMenuEl> = ({ name }) => {
    const navigate = useNavigate();

  return (
    <li className={styles.menu_el} onClick={() => navigate(`/${name}`)}>{name}</li>
  )
}

export default MenuEl;
