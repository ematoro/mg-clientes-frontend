<script setup>
import { onMounted, reactive } from "vue";
import { useClientesStore } from "../stores/clientesStore";

const store = useClientesStore();

const form = reactive({
  id: null,
  codigo: "",
  razonSocial: "",
  cuit: "",
  email: "",
  activo: true,
});

async function agregar() {
  const payload = {
    // enviar id como número sólo si fue completado
    ...(form.id ? { id: Number(form.id) } : {}),
    codigo: form.codigo,
    razonSocial: form.razonSocial,
    cuit: form.cuit,
    email: form.email,
    activo: !!form.activo,
  };

  await store.agregar(payload);

  form.id = null;
  form.codigo = "";
  form.razonSocial = "";
  form.cuit = "";
  form.email = "";
  form.activo = true;
}

onMounted(() => store.cargar());
</script>

<template>
  <div style="max-width: 960px; margin: 0 auto; padding: 16px;">
    <h1>MG Clientes</h1>

    <div v-if="store.error" style="background:#ffe6e6; padding:10px; margin: 12px 0;">
      {{ store.error }}
    </div>

    <div style="display:flex; gap:8px; flex-wrap: wrap; margin: 12px 0;">
      <input v-model="form.id" placeholder="ID (opcional)" style="width:90px" />
      <input v-model="form.codigo" placeholder="Código" />
      <input v-model="form.razonSocial" placeholder="Razón Social" />
      <input v-model="form.cuit" placeholder="CUIT" />
      <input v-model="form.email" placeholder="Email" />
      <label style="display:flex; align-items:center; gap:6px">
        <input type="checkbox" v-model="form.activo" /> Activo
      </label>
      <button @click="agregar">Agregar</button>
      <button @click="store.cargar" :disabled="store.loading">
        {{ store.loading ? "Cargando..." : "Refrescar" }}
      </button>
    </div>

    <table width="100%" border="1" cellpadding="6" cellspacing="0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Código</th>
          <th>Razón Social</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="c in store.items" :key="c.id">
          <td>{{ c.id }}</td>
          <td>{{ c.codigo }}</td>
          <td>{{ c.razonSocial }}</td>
          <td>
            <button @click="store.borrar(c.id)">Eliminar</button>
          </td>
        </tr>
        <tr v-if="!store.loading && store.items.length === 0">
          <td colspan="4">Sin datos</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
