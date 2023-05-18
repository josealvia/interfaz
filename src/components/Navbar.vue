<template>
    <nav class="navbar navbar-dark bg-dark">
        <div class="container-fluid">
            <router-link 
                class="navbar-brand"
                :to="ruta"
            >{{getName}}</router-link>
            <div>
                <div v-if="!auth">
                    <router-link 
                        class="navbar-brand btn btn-primary btn-sm"
                        to="/login"
                    >Iniciar sesión</router-link>
                    <router-link 
                        class="navbar-brand btn btn-primary btn-sm"
                        to="/register"
                    >Registrarse</router-link>
                </div>
                <div v-else>
                    <router-link 
                        class="navbar-brand btn btn-dark"
                        to="/perfil"
                    >Perfil <fa icon="building"/></router-link>
                    <router-link 
                        class="navbar-brand btn btn-danger btn-sm"
                        to="/"
                        @click="logout"
                    >Cerrar sesión</router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex'
export default {
    name:'Navbar',
    setup(){

        const store = useStore();

        const auth = computed(()=>{
            return !!store.getters.getEmpresa;
        });

        const getName = computed(()=>{
            if(!store.getters.getEmpresa){
                return 'Invitado';
            }
            return store.getters.getEmpresa.nombre;
        });

        const ruta = computed(()=>{
            if(!store.getters.getEmpresa){
                return '/';
            }
            return '/empresa';
        });

        const logout = ()=>{
            store.dispatch('logout');
        }

        return {auth, getName, logout, ruta}
    }
}
</script>
