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
        <div class="search img-cont">
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
          <h3 id="vinBlanc"> {{str_vinBlanc}} </h3>
          <router-link
            class="vin"
            v-for="data in myJson.items"
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
            >{{ prices.price }} €</div>
          </router-link>
          <h3> {{ str_vinRouge }} </h3>
          <router-link
            class="vin"
            v-for="data in myJson.items"
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
          <h3> {{str_vinRose}} </h3>
          <router-link
            class="vin"
            v-for="data in myJson.items"
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
        </div>
        <div class="right-image">
          <img id="bar" src="image/right-side.jpg">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import json from "../assets/wines.json";
export default {
  data() {
    return {
      visible: false,
      myJson: json,
      str_vinBlanc: "vins blancs",
      str_vinRouge: "vins rouges",
      str_vinRose: "rosés"
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
    toEn: function() {
      this.str_vinBlanc = "white wine";
      this.str_vinRouge = "red wine";
      this.str_vinRose = "rosés";
    }
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
</style>
