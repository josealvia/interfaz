<template>
<div class="d-flex justify-content-center">
  <div class="card mb-3">
    <img src="../assets/portada.jpg" class="card-img-top" alt="Portada">
    <div class="card-body">
      <h1 class="card-title">Sistema de vacantes para la empresa</h1>
      <p class="card-text">El sistema se basa en que las empresas pueden subir las vacantes que tengas disponibles y los estudiantes postular.</p>
    </div>
  </div>

</div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
export default {
  name: 'Home',
  components: {

  },
  setup(){
    const store = useStore();

    const empresa = computed(()=>{
      return store.getters.getEmpresa;
    })

    return {empresa}
  }
}
</script>
