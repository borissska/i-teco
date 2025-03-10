import { HTMLAttributes } from "react";

export interface IModalProps extends HTMLAttributes<HTMLDivElement> {
    close: () => void;
}