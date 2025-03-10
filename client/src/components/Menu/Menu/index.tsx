import { FC } from "react";
import styles from "./Menu.module.scss";
import MenuEl from "../MenuEl";
import { menuList } from "./Menu.constants";

const Menu: FC = () => {
  return (
    <aside className={styles.menu}>
      <h1>Меню</h1>
      <ul className={styles.menu__list}>
        {menuList.map((el, index) => (
          <MenuEl key={index} name={el} />
        ))}
      </ul>
    </aside>
  );
};

export default Menu;
