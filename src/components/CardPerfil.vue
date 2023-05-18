<template>
  <div class="row mt-5 d-flex justify-content-center">
      <div class="col-8">
          <div class="card">
              <h2 class="card-header text-center">
                  {{empresa.nombre}}
              </h2>
              <div class="card-body">
                  <p><strong>Descripcion: </strong>{{empresa.descripcion}}</p>
                  <p><strong>Ruc: </strong>{{empresa.ruc}}</p>
                  <p><strong>Dirección: </strong>{{empresa.direccion}}</p>
                  <p><strong>Teléfono: </strong>{{empresa.telefono}}</p>
                  <p><strong>Email: </strong>{{empresa.email}}</p>
              </div>
              <div class="card-footer d-flex justify-content-center">
                <button 
                    class="btn btn-success w-50"
                    @click="editar = true"
                >Editar</button>

              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex'
import { inject } from '@vue/runtime-core';
export default {
    name: 'CardPerfil',
    setup(){
        const store = useStore();
        const editar = inject('editar')

        const empresa = computed(()=>{
            return store.getters.getEmpresa;
        })

        return {empresa, editar}
    }

}
</script>
