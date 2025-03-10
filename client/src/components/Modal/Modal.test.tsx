import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Modal from "./index";

const container = document.createElement("div");
container.id = "modal";
document.body.appendChild(container);

test("Рендерит модальное окно", () => {
  render(
    <Modal close={jest.fn()}>
      <p>Тест</p>
    </Modal>
  );
  expect(screen.getByText("Тест")).toBeInTheDocument();
});

test("Закрывается при клике вне контента", async () => {
  const closeMock = jest.fn();

  render(
    <Modal close={closeMock}>
      <p>Тест</p>
    </Modal>
  );

  fireEvent.click(screen.getByRole("dialog"));

  await waitFor(() => {
    expect(closeMock).toHaveBeenCalled();
  });
});

test("Не закрывается при клике внутри контента", async () => {
    const closeMock = jest.fn();

    render(
      <Modal close={closeMock}>
        <p>Тест</p>
      </Modal>
    );
  
    fireEvent.click(screen.getByRole("dialog"));
  
    await waitFor(() => {
      expect(closeMock).toHaveBeenCalled();
    });
});
