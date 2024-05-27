const request = require("supertest");
const app = require('../index');


describe("Operaciones CRUD de cafes", () => {
  
it("OBTENER UN STATUS 200", async () => {
  const resultado = await request(app).get("/cafes");
  expect(resultado.status).toBe(200);
  expect(Array.isArray(resultado.body)).toBe(true);
  expect(resultado.body.length).toBeGreaterThan(0);
  expect(resultado.body[0]).toHaveProperty("id");
  expect(resultado.body[0]).toHaveProperty("nombre");
});

  
  test("debería devolver un código 404 si el café no existe", async () => {
    const idInexistente = 400;
    const resultado = await request(app)
        .delete(`/cafes/${idInexistente}`)
        .set('Authorization', 'Bearer token')
        .expect('Content-Type', /json/)
        .expect(404);
        
        expect(resultado.body).toEqual({ message: 'No se encontró ningún cafe con ese id' });

});

    

    it('agrega un nuevo café y devuelve un código 201', async () => {
      const nuevoCafe = { id: 101, nombre: "Nuevo Café" }; 
      const resultado = await request(app)
      .post('/cafes')
      .send(nuevoCafe)
      .expect('Content-Type', /json/)
      .expect(201);
      expect(resultado.body).toEqual(expect.arrayContaining([nuevoCafe]));

  });
  
  it('actualizacion de producto con distinto id devuelve un status code 400', async () => {
    const cafeActualizado = { id: 2, nombre: "Café Actualizado" };
    const resultado = await request(app)
        .put(`/cafes/1`)
        .send(cafeActualizado)
        .expect('Content-Type', /json/)
        .expect(400);
    expect(resultado.body).toEqual({ message: "El id del parámetro no coincide con el id del café recibido" });
});
});
