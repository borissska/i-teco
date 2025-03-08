import request from "supertest";
import app from "../../app";


describe("GET /orders", () => {
  it("Проверка на получение списка заказов", async () => {
    const response = await request(app).get("/orders");
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.orders).toBeInstanceOf(Array);
    expect(response.body.orders.length).toBeGreaterThan(0);
  });
});

describe("PUT /orders/:id", () => {
  it("Проверка состояния заказа", async () => {
    
    const response = await request(app)
      .put("/orders/1")
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.order.status).toBe("В процессе");
  });

  it("Проверка на то, что заказ не найден", async () => {
    
    const response = await request(app)
      .put("/orders/999")
    
    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Заказ не найден");
  });
});
