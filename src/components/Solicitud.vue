<template>
  <div class="card mb-2">
    <h5 class="card-header text-center">{{nombres}}</h5>
    <div class="card-body">
        <p><strong>Experiencia: </strong>{{solicitud.experiencia}}</p>
        <p><strong>Formación: </strong>{{solicitud.formacion}}</p>
        <p><strong>Teléfono: </strong>{{solicitud.telefono}}</p>
    </div>
    <div class="card-footer d-flex justify-content-center">
        <button
            class="btn btn-primary w-50"
            @click="procesar(solicitud)"
        >Aceptar</button>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from '@vue/reactivity'
import { inject, onMounted } from '@vue/runtime-core'
import { useStore } from 'vuex'
export default {
    name:'Solicitud',
    props:['solicitud'],
    setup(props){
        const vacante = reactive({
            _id:'',
            titulo: '',
            descripcion: '',
            fecha: '',
            estado: true,
            solicitudes:[],
            _estudiante: null
        })
        const store = useStore();
        const verSolicitudes = inject('verSolicitudes');

        const nombres = computed(()=>{
            return `${props.solicitud.nombre} ${props.solicitud.apellido}`
        })

        const procesar = async(_estudiante)=>{
            vacante._estudiante = _estudiante;
            vacante.estado = false;
            store.dispatch('aceptarSolicitud', vacante);
            verSolicitudes.value = false;
        }

        onMounted(()=>{
            let res = store.state.vacante;
            vacante._id = res._id;
            vacante.titulo = res.titulo;
            vacante.descripcion = res.descripcion;
            vacante.fecha = res.fecha;
            vacante.estado = res.estado;
            vacante.solicitudes = res.solicitudes;
            vacante._estudiante = res._estudiante;
        })

        return {nombres, procesar}
    }
}
</script>

<style>

</style>