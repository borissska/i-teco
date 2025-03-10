import { ITask } from "./Tasks.props";

export const mockData = [
  { name: "Задача 1", start: 2, duration: 3 },
  { name: "Задача 2", start: 5, duration: 4 },
  { name: "Задача 3", start: 1, duration: 6 },
  { name: "Задача 4", start: 7, duration: 2 },
];

export const transformedData: ITask[] = mockData.map((task) => ({
  name: task.name,
  start: task.start,
  end: task.start + task.duration,
}));