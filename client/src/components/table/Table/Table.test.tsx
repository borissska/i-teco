import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Table from "./";
import { Order } from "../../../shared/@types/order_type";

const mockData: Order[] = [
  {
    id: 1,
    orderNumber: "ORD123",
    productName: "Деталь A",
    quantity: 100,
    status: "В процессе",
    startDate: "2023-10-01",
    endDate: "2023-10-05",
  },
  {
    id: 2,
    orderNumber: "ORD124",
    productName: "Деталь B",
    quantity: 50,
    status: "Завершено",
    startDate: "2023-10-02",
    endDate: "2023-10-04",
  },
];

test("Рендерит таблицу с данными", () => {
  render(<Table data={mockData} onRowClick={jest.fn()} />);
  expect(screen.getByText("Деталь A")).toBeInTheDocument();
  expect(screen.getByText("Деталь B")).toBeInTheDocument();
});

test("Фильтрует данные по статусу", () => {
  render(<Table data={mockData} onRowClick={jest.fn()} />);
  fireEvent.change(screen.getByRole("combobox"), { target: { value: "Завершено" } });
  expect(screen.queryByText("Деталь A")).not.toBeInTheDocument();
  expect(screen.getByText("Деталь B")).toBeInTheDocument();
});

test("Сортировка изменяет порядок", async () => {
    render(<Table data={mockData} onRowClick={jest.fn()} />);
    fireEvent.click(screen.getByText("Товар"));
    await waitFor(() => {
      expect(screen.getAllByRole("row")[1]).toHaveTextContent("Деталь B");
    });
  });
