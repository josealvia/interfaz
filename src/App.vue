<template>
  <Cargando v-if="cargando" /> 
  <div v-else>
    <Navbar />
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from '@vue/runtime-core'
import Navbar from './components/Navbar.vue'
import { useStore } from 'vuex'
import Cargando from './components/Cargando.vue'
export default {
  components: { Navbar, Cargando },
  setup() {
    const cargando = ref(false);
    const store = useStore();

    onMounted(async()=>{
      cargando.value = true;
      await store.dispatch('verificarSesion');
      cargando.value = false;
    })
    
    return {cargando}
  },
}
</script>
