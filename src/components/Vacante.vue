<template>
  <tr>
      <td>{{ vacante.titulo }}</td>
      <td>{{ vacante.descripcion }}</td>
      <td>{{ fecha }}</td>
      <td>
        <button 
          type="button" 
          class="btn btn-ligth position-relative"
          title="Ver solicitudes"
          @click="mostrarSolicitudes(vacante)"
        >
          <fa class="text-primary me-1 fs-4" icon="eye" /> 
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {{ vacante.solicitudes.length }}+
          </span>
        </button>
      </td>
      <td>{{ pasante }}</td>
      <div class="d-flex">
          <button 
            class="btn btn-ligth me-2 text-success"
            title="Editar vacante"
            @click="editarVacante(vacante)"
          ><fa icon="edit"/></button>
          <button 
            class="btn btn-ligth text-danger"
            @click="eliminarVacante(vacante._id)"
            title="Eliminar vacante"
          ><fa icon="trash-alt"/></button>
      </div>
  </tr>
</template>

<script>
import { computed, inject } from '@vue/runtime-core';
import { useStore } from 'vuex';
export default {
    name:'Vacante',
    props: ['vacante'],
    setup(props){
        const store = useStore();
        const editar = inject('editar');
        const verSolicitudes = inject('verSolicitudes');

        const eliminarVacante = async(id)=>{
            await store.dispatch('deleteVacante',id);
        }

        const editarVacante = (item)=>{
            store.dispatch('getVacante',item);
            editar.value = true;
        }

        const mostrarSolicitudes = (vacante)=>{
            store.dispatch('getVacante',vacante);
            verSolicitudes.value = true;
        }

        const pasante = computed(()=>{
          if(!props.vacante._estudiante){
            return 'N/A'
          }
          return `${props.vacante._estudiante.nombre} ${props.vacante._estudiante.apellido}`;
        });

        const fecha = computed(()=>{
          const date = new Date(props.vacante.fecha)
          return date.toLocaleString()
        });
    
        return {eliminarVacante, editarVacante, pasante, fecha, mostrarSolicitudes}
    }
}
</script>

<style>

</style>