import { FC } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { transformedData } from "./Tasks.constants";
import styles from "./Tasks.module.scss"
import CustomTooltip from "../CustomTooltip";

const Tasks: FC = () => {
  return (
    <div className={styles.task_container}>
      <h1>График выполнения задач</h1>
      <ResponsiveContainer width='100%' height={400}>
        <BarChart
          layout='vertical'
          data={transformedData}
          className={styles.bar_chart}
        >
          <XAxis type='number' domain={[0, "dataMax"]} />
          <YAxis dataKey='name' type='category' width={100} />
          <Tooltip content={<CustomTooltip />}/>
          <Bar dataKey='start' stackId='a' fill='transparent' />
          <Bar dataKey={(d) => d.end - d.start} stackId='a' fill='#82ca9d' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Tasks;
