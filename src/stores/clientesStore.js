import { defineStore } from "pinia";
import { listarClientes, crearCliente, eliminarCliente } from "../services/clientesApi";

export const useClientesStore = defineStore("clientes", {
  state: () => ({
    items: [],
    loading: false,
    error: "",
  }),

  actions: {
    async cargar() {
      this.loading = true;
      this.error = "";
      try {
        this.items = await listarClientes();
      } catch (e) {
        this.error = e?.response?.data?.message || e.message || "Error cargando clientes";
      } finally {
        this.loading = false;
      }
    },

    async agregar(payload) {
      this.error = "";
      try {
        const creado = await crearCliente(payload);
        this.items.unshift(creado);
      } catch (e) {
        this.error = e?.response?.data?.message || e.message || "Error creando cliente";
        throw e;
      }
    },

    async borrar(id) {
      this.error = "";
      try {
        await eliminarCliente(id);
        this.items = this.items.filter((x) => x.id !== id);
      } catch (e) {
        this.error = e?.response?.data?.message || e.message || "Error eliminando cliente";
        throw e;
      }
    },
  },
});
