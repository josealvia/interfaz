<template>
    <div class="row d-flex justify-content-center">
        <h3 class="text-center my-3">Agregar Vacante</h3>
        <div class="mt-2 col-8">
            <input 
            type="text"
            class="form-control mb-2"
            placeholder="Titulo"
            v-model.trim="vacante.titulo"
            >
            <textarea 
            class="form-control mb-2" 
            rows="4"
            placeholder="Descripcion"
            v-model.trim="vacante.descripcion"
            ></textarea>
            <div v-if="vacante._estudiante" class="mb-4">
                <input 
                    class="form-check-input me-2" 
                    type="checkbox" 
                    id="check"
                    v-model="vacante.estado"    
                >
                <label 
                    class="form-check-label" 
                    for="check"
                    
                >Quitar pasante <strong>
                    ({{pasante}})</strong></label>
            </div>
            <div class="d-flex justify-content-start">
                <button
                class="btn btn-primary me-3"
                :disabled = "bloquear"
                @click="procesar"
                >Procesar</button>
                <button
                    class="btn btn-danger"
                    aria-label="Close"
                    @click="cancelar"
                >Cancelar</button>
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed, reactive } from '@vue/reactivity'
import { inject, onMounted } from '@vue/runtime-core';
export default {
    name:'FormVacante',
    setup(){
        const store = useStore();
        const vacante = reactive({
            _id:'',
            titulo: '',
            descripcion: '',
            fecha: '',
            estado: true,
            solicitudes:[],
            _estudiante: null
        })
        const agregar = inject('agregar');
        const editar = inject('editar');
        
        const bloquear = computed(()=>{
            if(vacante.titulo.length == 0){
                return true;
            }
            if(vacante.descripcion.length == 0){
                return true;
            }
            return false;
        });

        const pasante = computed(()=>{
          return `${vacante._estudiante.nombre} ${vacante._estudiante.apellido}`;
        });

        const cancelar = ()=>{
            if(editar.value){
                store.dispatch('getVacante', null)
                editar.value = false;
                return;
            }
            agregar.value = false;
        }

        const procesar = async()=>{
            if(agregar.value){
                await store.dispatch('addVacante',vacante);
                agregar.value = false;
            }
            if(editar.value){
                if(vacante.estado){
                    vacante._estudiante = null;
                }
                await store.dispatch('editVacante',vacante)
                editar.value = false;
            }
        }

        onMounted(()=>{
            if(editar.value){
                let res = store.state.vacante;
                vacante._id = res._id;
                vacante.titulo = res.titulo;
                vacante.descripcion = res.descripcion;
                vacante.fecha = res.fecha;
                vacante.estado = res.estado;
                vacante.solicitudes = res.solicitudes;
                vacante._estudiante = res._estudiante;
            }
        })

        return {vacante, procesar, bloquear, agregar, editar, cancelar, pasante}
    }
}
</script>
