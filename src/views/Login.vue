<template>
  <h1>Login</h1>
  <Error v-if="error" />
  <form @submit.prevent="procesar">
        <div class="my-3">
            <input
                type="email" 
                class="form-control" 
                aria-describedby="emailHelp"
                placeholder="Ingresa el email"
                v-model="datos.email"
            >
        </div>
        <div class="mb-3">
            <input 
                type="password" 
                class="form-control" 
                placeholder="Ingresa la contraseña"
                v-model="datos.password"    
            >
        </div>
        <button 
            type="submit" 
            class="btn btn-primary w-100"
            :disabled = "bloquear"
        >Ingresar</button>
    </form>
</template>

<script>
import {useStore} from 'vuex'
import { computed, reactive } from '@vue/reactivity';
import Error from '../components/Error.vue';
import { onMounted } from '@vue/runtime-core';
export default {
  components: { Error },
  name:'Login',
  setup(){
    const datos = reactive({
      email: '',
      password: ''
    })

    const store = useStore();

    const bloquear = computed(()=>{
      if(!datos.email.includes('@')){
          return true;
      }
      if(datos.password.length < 8){
          return true;
      }
      return false;
    })

    const error = computed(()=>{
      return store.getters.getError;
    })

    const procesar = async()=>{
      await store.dispatch('signin', datos);
    }

    onMounted(()=>{
      store.dispatch('restablecerError');
    });

    return {datos, bloquear, procesar, error}
  }
}
</script>
