import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import( '../views/Register.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import( '../views/Login.vue')
  },
  {
    path: '/empresa',
    name: 'Empresa',
    component: () => import( '../views/Empresa.vue'),
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: () => import( '../views/Perfil.vue'),
    meta:{
      requiresAuth: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next)=>{
  if(to.meta.requiresAuth && !store.getters.getEmpresa){
    console.log('OK');
    next('/');
    return
  }
  if(!to.meta.requiresAuth && !!store.getters.getEmpresa){
    next('/empresa')
    return;
  }
  next()
})

export default router
