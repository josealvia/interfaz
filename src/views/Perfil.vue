<template>
  <CardPerfil v-if="!editar" />
  <FormPerfil v-else />
</template>

<script>
import { computed, ref } from '@vue/reactivity';
import { useStore } from 'vuex'
import CardPerfil from '../components/CardPerfil.vue';
import FormPerfil from '../components/FormPerfil.vue';
import { provide } from '@vue/runtime-core';
export default {
  name:'Perfil',
  components: { CardPerfil, FormPerfil},
  setup(){
    const editar = ref(false);
    const store = useStore();

    provide('editar', editar);

    const empresa = computed(()=>{
      return store.getters.getEmpresa;
    })
    return {store, empresa, editar}
  }
}
</script>

<style>

</style>