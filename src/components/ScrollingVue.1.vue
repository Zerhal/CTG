<template>
  <div>
    <header class="header">
      <div class="left-header">
        <router-link to="/" class="header__icon" id="header__icon">
          <i class="fas fa-home size:7x"></i>
        </router-link>
        <nav class="menu"></nav>
        <div class="logo">
          <img class="logo" src="image/logo-2.png">
        </div>
      </div>
      <div class="right-header">
        <div v-if="searchVisible">
          <input 
          placeholder="Recherche"
          v-on:keyup="getfilteredData"
          name="searchBar"
          id="searchBar"
          type="text"
          v-model="search"
          list="search">
          <datalist id="search">
            <option v-for="data in filteredData" :key="data.id"> <router-link :to="{name: 'detail', params: {id: data.id}}">{{data.name}}</router-link></option>
          </datalist>
        </div>
        <div @click="searchToggle" class="search img-cont">
          <i class="fal fa-search"></i>
        </div>
        <div @click="toFr()" class="local-fr img-cont">
          <img src="image/france.svg">
        </div>
        <div @click="toEn()" class="local-en img-cont">
          <img src="image/united-kingdom.svg">
        </div>
      </div>
    </header>

    <div class="site-content">
      <div class="container">
        <div class="left-containter-flip">
          <hooper>
            <slide v-for="ds in dataSplited" :key="ds.id">
              <h3 v-if="ds.some(e => e.color_id === 1)" id="vinBlanc">{{str_vinBlanc}}</h3>

              <router-link
                class="vin"
                v-for="data in ds"
                v-bind:key="data.id"
                v-if="data.color_id === 1"
                :to="{name: 'detail', params: {id: data.id}}"
              >
                <div class="nom-vin">{{ data.name }}</div>
                <div class="annee-vin">{{ data.millesime }}</div>

                <div
                  class="prix-verre"
                  v-for="prices in data.prices"
                  v-if="prices.quantity_id === 1"
                  :key="prices.quantity_id"
                >{{ prices.price }}</div>
              </router-link>
              <h3 v-if="ds.some(e => e.color_id === 2)">{{ str_vinRouge }}</h3>
              <router-link
                class="vin"
                v-for="data in ds"
                v-bind:key="data.id"
                v-if="data.color_id === 2"
                :to="{name: 'detail', params: {id: data.id}}"
              >
                <div class="nom-vin">{{ data.name }}</div>
                <div class="annee-vin">{{ data.millesime }}</div>

                <div
                  class="prix-verre"
                  v-for="prices in data.prices"
                  v-if="prices.quantity_id === 1"
                  :key="prices.quantity_id"
                >{{ prices.price }}</div>
              </router-link>
              <h3 v-if="ds.some(e => e.color_id === 3)">{{str_vinRose}}</h3>
              <router-link
                class="vin"
                v-for="data in ds"
                v-bind:key="data.id"
                v-if="data.color_id === 3"
                :to="{name: 'detail', params: {id: data.id}}"
              >
                <div class="nom-vin">{{ data.name }}</div>
                <div class="annee-vin">{{ data.millesime }}</div>

                <div
                  class="prix-verre"
                  v-for="prices in data.prices"
                  v-if="prices.quantity_id === 1"
                  :key="prices.quantity_id"
                >{{ prices.price }}</div>
              </router-link>
            </slide>
          </hooper>
        </div>

        <div class="right-image">
          <div class="img-right">
            <img id="bar" src="image/right-side.jpg">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Hooper, Slide } from "hooper";
import "hooper/dist/hooper.css";
import json from "../assets/wines.json";

export default {
  components: {
    Hooper,
    Slide
  },
  data() {
    return {
      visible: false,
      searchVisible: false,
      myJson: json,
      str_vinBlanc: "vins blancs",
      str_vinRouge: "vins rouges",
      str_vinRose: "rosés",
      dataSplited: [],
      search: "",
      filteredData: []
    };
  },
  methods: {
    toggle: function() {
      this.visible = !this.visible;
    },
    toFr: function() {
      this.str_vinBlanc = "vins blancs";
      this.str_vinRouge = "vins rouges";
      this.str_vinRose = "rosés";
    },
    getfilteredData: function() {
      this.filteredData = json.items;
      let filteredDataByfilters = [];
      //first check if filters where selected     
      if (this.search !== "") {
        this.filteredData = json.items;
        filteredDataByfilters = this.filteredData.filter(
          obj => obj.name.toLowerCase().indexOf(this.search.toLowerCase()) >= 0
        );
        this.filteredData = filteredDataByfilters;
      }
    },
    toEn: function() {
      this.str_vinBlanc = "white wine";
      this.str_vinRouge = "red wine";
      this.str_vinRose = "rosés";
    },

    searchToggle: function() {
      this.searchVisible = !this.searchVisible;
    },
    splitData: function() {
      let sortedData = this.myJson.items;
      sortedData.sort((a,b) => (a.color_id > b.color_id) ? 1 : ((b.color_id > a.color_id) ? -1 : 0)); 
      for (let i = 0; i < sortedData.length; i += 10) {
        this.dataSplited.push(sortedData.slice(i, i + 9));
      }
    }
  },
  mounted() {
    this.splitData();
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s, transform 1s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
  transform: translateY(20px);
}

.hooper {
  height: 95%;
}
</style>
