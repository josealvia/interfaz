<template>
    <button
        class="btn"
        title="Regresar"
        @click="regresar"
    >
        <fa class="text-danger fs-1" icon='backspace'/>
    </button>
    <div class="row d-flex justify-content-center">
        <div class="col-5">
            <h1 class="text-center">Solicitudes</h1>
            <p v-if="vacante.solicitudes.length == 0">
                No tiene solicitudes 😢
            </p>
            <Solicitud v-else
                v-for="item in vacante.solicitudes"
                :key="item.id"
                :solicitud="item"
             />
        </div>
    </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import {useStore} from 'vuex'
import Solicitud from './Solicitud.vue';
import { inject } from '@vue/runtime-core';
export default {
    name:'CardSolicitudes',
    components: { Solicitud },
    setup(){
        const verSolicitudes = inject('verSolicitudes');
        const store = useStore();

        const vacante = computed(()=>{
            return store.getters.getVacante;
        });

        const regresar = computed(()=>{
            store.dispatch('getVacante',null);
            verSolicitudes.value = false;
        });

        return {vacante, regresar}
    }
}
</script>
