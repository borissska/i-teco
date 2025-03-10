import { FC, useEffect, useState } from "react";
import styles from "./Modal.module.scss";
import ReactDom from "react-dom";
import { IModalProps } from "./Modal.props";
import classNames from "classnames";

const Modal: FC<IModalProps> = ({ children, close, ...props }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(close, 300);
  };

  return ReactDom.createPortal(
    <div
      className={classNames(styles.modal, {
        [styles.show]: isVisible,
        [styles.hide]: !isVisible,
      })}
      onClick={handleClose}
      role='dialog'
    >
      <div
        className={styles.modal_info}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {children}
      </div>
    </div>,
    document.getElementById("modal") as HTMLElement
  );
};

export default Modal;
