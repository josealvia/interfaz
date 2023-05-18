<template>
  <Cargando v-if="cargando" />
  <div v-else>
    <div v-if="!agregar && !editar && !verSolicitudes">
      <h1 class="text-center mt-2">Vacantes</h1>
      <a 
        class="btn p-0 d-flex justify-content-end"
        @click="agregar = true"
      ><fa class="text-primary fs-1" icon="plus-circle"/></a>
      <TableVacantes />
    </div>

    <CardSolicitudes v-else-if="verSolicitudes" />

    <FormVacante v-else />

  </div>

</template>

<script>
import { ref } from '@vue/reactivity';
import {useStore} from 'vuex';
import FormVacante from '../components/FormVacante.vue';
import { onMounted, provide } from '@vue/runtime-core';
import TableVacantes from '../components/TableVacantes.vue';
import CardSolicitudes from '../components/CardSolicitudes.vue';
import Cargando from '../components/Cargando.vue';

export default {
  components: { FormVacante, TableVacantes, CardSolicitudes, Cargando },
  name: 'Empresa',
  setup(){
    const cargando = ref(false);
    const agregar = ref(false);
    const editar = ref(false);
    const verSolicitudes = ref(false);
    const store = useStore();

    provide('agregar',agregar);
    provide('editar', editar)
    provide('verSolicitudes', verSolicitudes);

    onMounted(async()=>{
      cargando.value = true;
      await store.dispatch('cargarVacantes')
      cargando.value = false;
    });

    return {agregar, editar, verSolicitudes, cargando}
  }
}
</script>