import Vue from "vue";
import VueRouter from "vue-router";
import AccueilVue from "./components/AccueilVue.vue";
import ScrollingVue from "./components/ScrollingVue.vue";
import ScrollingVue1 from "./components/ScrollingVue.1.vue";
import InteractiveVue from "./components/InteractiveVue.vue";
import DetailVue from "./components/DetailVue.vue";
import * as VueGoogleMaps from 'vue2-google-maps'
 
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDWmDjfygxHOvdMNLEnw3ik_uXOfA5zq80'
  }
});

Vue.use(VueRouter);

const router = new VueRouter({
  mode:"history",
  routes: [
    {
      path: "/",
      name: "accueil",
      component: AccueilVue
    },
    {
      path: "/interactive",
      name: "interactive",
      component:  InteractiveVue
    },
    {
      path: "/classic",
      name: "classic",
      component: ScrollingVue1,
      props: true
    },
    {
      path: "/classic1",
      name: "classic1",
      component: ScrollingVue1,
      props: true
    },
    {
      path: "/detail/:id",
      name: "detail",
      component: DetailVue,
      props: (route) => ({ query: route.params.id })
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});

import App from './App.vue'
new Vue({
  el: '#app',
  router,
  render: h => h(App)
}).$mount('#app')
