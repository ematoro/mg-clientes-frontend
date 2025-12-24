import http from "./http";

// ✅ Ajustá estas rutas mirando tu Swagger.
// Dejo el patrón típico:
export async function listarClientes() {
  const { data } = await http.get("/api/Clientes");
  return data;
}

export async function crearCliente(payload) {
  const { data } = await http.post("/api/Clientes", payload);
  return data;
}

export async function eliminarCliente(id) {
  await http.delete(`/api/Clientes/${id}`);
}
