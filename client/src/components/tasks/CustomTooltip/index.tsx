import { FC } from "react";
import { TooltipProps } from "recharts";
import { ITask } from "../Tasks/Tasks.props";
import styles from "./CustomTooltip.module.scss";

const CustomTooltip: FC<TooltipProps<number, string>> = ({ active, payload }) => {
  if (!active || !payload || payload.length < 2) return null;

  const task = payload[1].payload as ITask;
  const duration = task.end - task.start;

  return (
    <div className={styles.tooltip}>
      <p>
        <strong>{task.name}</strong>
      </p>
      <p>⏳ Начало: {task.start}</p>
      <p>⌛ Окончание: {task.end}</p>
      <p>📅 Длительность: {duration}</p>
    </div>
  );
};

export default CustomTooltip;
