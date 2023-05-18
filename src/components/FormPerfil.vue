<template>
  <div class="row mt-5 d-flex justify-content-center">
      <div class="col-8">
          <h3 class="text-center mb-3">Editar perfil</h3>
          <Error v-if="error" />
          <div>
              <div class="mb-2">
                <input 
                    class="form-control"
                    type="text"
                    placeholder="Nombre"
                    v-model="empresa.nombre"
                >
              </div>
              <div class="mb-2">
                <input 
                    class="form-control"
                    type="text"
                    placeholder="Descripción"
                    v-model = "empresa.descripcion"
                >
              </div>
              <div class="mb-2">
                <input 
                    class="form-control"
                    type="text"
                    placeholder="Ruc"
                    v-model = "empresa.ruc"
                >
              </div>
              <div class="mb-4">
                <input 
                    class="form-control"
                    type="text"
                    placeholder="Dirección"
                    v-model="empresa.direccion"
                >
              </div>
              <div class="mb-4">
                <input 
                    class="form-control"
                    type="text"
                    placeholder="Telefono"
                    v-model="empresa.telefono"
                >
              </div>
              <div class="d-flex justify-content-center mb-3">
                <button 
                    class="btn btn-primary w-25 me-5"
                    @click="procesar"
                >
                    Procesar
                </button>
                <button 
                    class="btn btn-danger w-25"
                    @click="editar=false"   
                >
                    Cancelar
                </button>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { computed, reactive } from '@vue/reactivity';
import { useStore } from 'vuex'
import { inject, onMounted } from '@vue/runtime-core';
import Error from '../components/Error.vue'

export default {    
    name:'FormPerfil',
    components:{Error},
    setup(){
        const store = useStore();
        const editar = inject('editar')
        const empresa = reactive({
            _id: '',
            nombre:'',
            descripcion:'',
            ruc:'',
            telefono:'',
            direccion:'',
            email: '',
            token: ''
        })
        const error = computed(()=>{
            return store.getters.getError;
        })

        const procesar = async()=>{
            await store.dispatch('editEmpresa', empresa);
            console.log(error.value);
            if(!error.value){
                editar.value = false;
            }
        }

        onMounted(()=>{
            const res = store.getters.getEmpresa;
            empresa._id = res._id;
            empresa.nombre = res.nombre;
            empresa.descripcion = res.descripcion;
            empresa.ruc = res.ruc;
            empresa.direccion = res.direccion;
            empresa.telefono = res.telefono;
            empresa.email = res.email;
            empresa.token = res.token;
        })

        return {empresa, procesar, editar, error}
    }
}
</script>
