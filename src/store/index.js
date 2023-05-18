import { createStore } from 'vuex'
import router from '../router'

export default createStore({
  state: {
    vacantes: [],
    vacante: {
      _id:'',
      titulo: '',
      fecha: '',
      estado: true,
      solicitudes:[],
      _estudiante: null
    },
    empresa: null,
    error: null
  },
  mutations: {
    setError(state, payload){
      if(payload === 'jwt expired'){
        router.push('/')
        return;
      }
      state.error = payload;
    },
    setEmpresa(state, payload){
      state.empresa = payload;
    },
    setVacantes(state, payload){
      state.vacantes = payload;
    },
    setVacante(state, payload){
      if(!payload){
        state.vacante = {
          _id:'',
          titulo: '',
          descripcion: '',
          fecha: '',
          estado: true,
          solicitudes:[],
          _estudiante: null
        }
        return;
      }
      state.vacante = payload;
    },
    addVacante(state, payload){
      state.vacantes.push(payload)
    },
    deleteVacante(state, payload){
      state.vacantes = state.vacantes.filter(i => i._id !== payload)
    },
    editVacante(state, payload){
      state.vacantes = state.vacantes.map(i => i._id === payload._id ? payload : i);
      state.vacante = {
        _id:'',
        titulo: '',
        descripcion: '',
        fecha: '',
        estado: true,
        solicitudes:[],
        _estudiante: null
      }
    }
  },
  actions: {
    logout({commit}){
      localStorage.removeItem('empresa');
      commit('setEmpresa', null);
    },
    async signup({commit}, empresa){
      try {
        const res = await fetch('https://backendempresa.azurewebsites.net/api/empresa/signup',{
          method:'POST',
          headers: {
              "Content-Type": "application/json",
          },
          body:JSON.stringify(empresa)
        })
        
        const data = await res.json();
        if(data.error){
          commit('setError',data.error.message)
          return;
        }
        commit('setError',null);
        commit('setEmpresa',data.data);
        localStorage.setItem('empresa', JSON.stringify(data.data));
        router.push('/empresa');
      } catch (error) {
        console.log(error);
      }
    },
    async signin({commit}, empresa){
      try {
        const res = await fetch('https://backendempresa.azurewebsites.net/api/empresa/signin',{
          method:'POST',
          headers: {
              "Content-Type": "application/json",
          },
          body:JSON.stringify({
            email: empresa.email, 
            password: empresa.password
          })
        })
        const data = await res.json();
        if(data.error){
          commit('setError',data.error.message)
          return;
        }
        commit('setError',null);
        commit('setEmpresa',data.data);
        localStorage.setItem('empresa', JSON.stringify(data.data));
        router.push('/empresa');
      } catch (error) {
        console.log(error);
      }
    },
    async editEmpresa({commit, state}, empresa){
      try {
        const res = await fetch('https://backendempresa.azurewebsites.net/api/empresa',{
          method:'PUT',
          headers: {
              "Content-Type": "application/json",
              "x-access-token": state.empresa.token
          },
          body:JSON.stringify(empresa)
        })
        
        const data = await res.json();
        if(data.error){
          commit('setError',data.error.message)
          return;
        }
        commit('setError',null);
        commit('setEmpresa', empresa);
        localStorage.setItem('empresa', JSON.stringify(empresa))
      } catch (error) {
        console.log(error);
      }
    },
    async verificarSesion({ commit, state }){
      try {
        if(localStorage.getItem('empresa')){
          commit('setEmpresa', JSON.parse(localStorage.getItem('empresa')));
          const res = await fetch('https://backendempresa.azurewebsites.net/api/empresa',{
            method: 'GET',
            headers:{
              "Content-Type": "application/json",
              "x-access-token": state.empresa.token
            }
          });
          const data = await res.json();
          if(data.error){
            localStorage.removeItem('empresa');
            router.push('/')
            return;
          }
        }
        else{
          commit('setEmpresa',null);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async cargarVacantes({ commit, state }){
      try{
        if(localStorage.getItem('empresa')){
          commit('setEmpresa', JSON.parse(localStorage.getItem('empresa')));
          const res = await fetch('https://backendempresa.azurewebsites.net/api/vacante',{
            method: 'GET',
            headers:{
              "Content-Type": "application/json",
              "x-access-token": state.empresa.token
            }
          });
          const data = await res.json();
          if(data.error){
            commit('setError',data.error.message);
            return;
          }
          commit('setError', null);
          commit('setVacantes', data.data);
        }
        else{
          commit('setEmpresa',null);
        }
      } catch(error){
        console.log(error);
      }
    },
    async addVacante({ commit, state }, vacante){
      try {
        const res = await fetch(`https://backendempresa.azurewebsites.net/api/vacante`,{
          method:'POST',
          headers:{
            "Content-Type": "application/json",
            "x-access-token": state.empresa.token
          },
          body: JSON.stringify({
            titulo: vacante.titulo,
            descripcion: vacante.descripcion
          })
        });

        const data = await res.json();
        if(data.error){
          commit('setError',data.error.message);
          return;
        }
        commit('setError', null)
        commit('addVacante', data.data);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteVacante({ commit, state }, idVacante){
      try {
        const res = await fetch(`https://backendempresa.azurewebsites.net/api/vacante/${idVacante}`,{
          method: 'DELETE',
          headers:{
            "Content-Type": "application/json",
            "x-access-token": state.empresa.token
          }
        });
        const data = await res.json();
        if(data.error){
          commit('setError', data.error.message);
          return;
        }
        commit('setError', null);
        commit('deleteVacante', idVacante);
      } catch (error) {
        console.log(error);
      }
    },
    async editVacante({ commit, state }, vacante){
      try {
        const res = await fetch(`https://backendempresa.azurewebsites.net/api/vacante/${vacante._id}`,{
          method: 'PUT',
          headers:{
            "Content-Type": "application/json",
            "x-access-token": state.empresa.token
          },
          body:JSON.stringify(vacante)
        });
        const data = await res.json();
        if(data.error){
          commit('setError',data.error);
          return;
        }
        commit('setError',null);
        commit('editVacante',vacante);
      } catch (error) {
        console.log(error);
      }
    },
    async aceptarSolicitud({ commit, state }, vacante){
      try {
        const res = await fetch(`https://backendempresa.azurewebsites.net/api/vacante/${vacante._id}`,{
          method: 'PUT',
          headers:{
            "Content-Type": "application/json",
            "x-access-token": state.empresa.token
          },
          body:JSON.stringify({
            _estudiante: vacante._estudiante._id
          })
        });
        const data = await res.json();
        if(data.error){
          commit('setError',data.error);
          return;
        }
        commit('setError',null);
        commit('editVacante',vacante);
      } catch (error) {
        console.log(error);
      }
    },
    restablecerError({commit}){
      commit('setError', null);
    },
    getVacante({ commit }, vacante){
      commit('setVacante', vacante)
    }
  },
  getters:{
    getEmpresa(state){
      return state.empresa;
    },
    getError(state){
      return state.error;
    },
    getVacantes(state){
      return state.vacantes;
    },
    getVacante(state){
      return state.vacante;
    }
  },
  modules: {
  }
})
