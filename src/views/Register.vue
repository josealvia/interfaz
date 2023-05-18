<template>
  <h1 class="text-center my-4">Registrarse</h1>
    <Error v-if="error" />
    <form @submit.prevent="procesar">
        <div class="my-3">
            <input
                type="text" 
                class="form-control" 
                placeholder="Nombre"
                v-model = "datos.nombre"  
              >
        </div>
        <div class="my-3">
            <input
                type="text" 
                class="form-control" 
                placeholder="Descripción"
                v-model = "datos.descripcion"  
              >
        </div>
        <div class="my-3">
            <input
                type="text" 
                class="form-control" 
                placeholder="Ruc"
                v-model = "datos.ruc"  
              >
        </div>
        <div class="my-3">
            <input
                type="text" 
                class="form-control" 
                placeholder="Teléfono"
                v-model = "datos.telefono"  
              >
        </div>
        <div class="my-3">
            <input
                type="text" 
                class="form-control" 
                placeholder="Dirección"
                v-model = "datos.direccion"  
              >
        </div>
        <div class="my-3">
            <input
                type="email" 
                class="form-control" 
                aria-describedby="emailHelp"
                placeholder="email"
                v-model = "datos.email"  
              >
        </div>
        <div class="mb-3">
            <input 
                type="password" 
                class="form-control" 
                placeholder="password"
                v-model= "datos.password"
              >
        </div>
        <button 
            type="submit" 
            class="btn btn-primary w-100 mb-4"
            :disabled="bloquear"
        >Registrarse</button>
    </form>
</template>

<script>
import {useStore} from 'vuex'
import { computed, reactive } from '@vue/reactivity';
import Error from '../components/Error.vue';
import { onMounted } from '@vue/runtime-core';
export default {
  components: { Error },
    name: 'Register',
    setup(){
        const datos = reactive({
            nombre: '',
            descripcion: '',
            ruc: '',
            telefono: '',
            direccion: '',
            password: '',
            email: ''
        });

        const store = useStore()

        const bloquear = computed(()=>{
            if(datos.nombre.length == 0){
                return true;
            }
            if(datos.descripcion.length == 0){
                return true;
            }
            if(datos.ruc.length == 0){
                return true;
            }
            if(datos.telefono.length == 0){
                return true;
            }
            if(datos.direccion.length == 0){
                return true;
            }
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
            await store.dispatch('signup', datos)
        }

        onMounted(()=>{
            store.dispatch('restablecerError');
        });

        return {datos, bloquear, procesar, error}
    }
}
</script>