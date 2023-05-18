<template>
  <table class="table table-striped">
      <thead>
          <tr>
            <th>Titulo</th>
            <th>Descripcion</th>
            <th>Fecha registro</th>
            <th>Solicitudes</th>
            <th>Pasante</th>
            <th>Operación</th>
          </tr>
      </thead>
      <tbody>
          <Vacante v-for="item in vacantes" 
            :key="item._id"
            :vacante="item"
            />
      </tbody>
  </table>
</template>

<script>
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';
import Vacante from './Vacante.vue';

export default {
  components: { Vacante },
  name: 'TableVacantes',
  setup(){
    const store = useStore();

    const vacantes = computed(()=>{
      return store.getters.getVacantes;
    });

    return {vacantes}
  }
}
</script>

<style>

</style>