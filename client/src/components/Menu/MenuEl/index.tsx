import { FC } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MenuEl.module.scss";
import { IMenuEl } from "./MenuEl.props";

const MenuEl: FC<IMenuEl> = ({ name }) => {
  const navigate = useNavigate();

  return (
    <li className={styles.menu_el} onClick={() => navigate(`/${name}`)}>
      {name}
    </li>
  );
};

export default MenuEl;
