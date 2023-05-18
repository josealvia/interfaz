<template>
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>{{error}}</strong>
        <button type="button" class="btn-close" data-bs-dismiss="alert" 
            aria-label="Close" @click="restablecerError"></button>
    </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import {useStore} from 'vuex'
export default {
    name: 'Error',
    setup(){
        const store = useStore();

        const error = computed(()=>{
            return store.getters.getError;
        })

        const restablecerError = ()=>{
            store.dispatch('restablecerError');
        }
        return {error, restablecerError}
    }
}
</script>
