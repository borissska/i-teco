import request from "supertest";
import app from "../../app";


describe("GET /equipment", () => {
  it("Проверка на получение списка оборудования", async () => {
    const response = await request(app).get("/equipment");
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.equipments).toBeInstanceOf(Array);
    expect(response.body.equipments.length).toBeGreaterThan(0);
  });
});

describe("PUT /equipment/:id", () => {
  it("Проверка состояния оборудования", async () => {
    
    const response = await request(app)
      .put("/equipment/1")
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.equipment.status).toBe("Работает");
  });

  it("Проверка на то, что оборудование не найдено", async () => {
    
    const response = await request(app)
      .put("/equipment/999")
    
    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Оборудование не найдено");
  });
});
