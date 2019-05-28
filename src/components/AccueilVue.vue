<template>
  <div class="site-container">
    <div class="site-pusher">
      <div class="accueil-header">
        <div @click="toFr()" class="accueil-local-fr img-cont">
          <img src="image/france.svg">
        </div>
        <div @click="toEn()" class="accueil-local-en img-cont">
          <img src="image/united-kingdom.svg">
        </div>
      </div>

      <div class="header-accueil">
        <img class="logo-accueil" src="image/logo-2.png">
      </div>
      <div class="site-content-accueil">
        <div class="container-accueil">
          <div class="left-content-accueil">
            <router-link to="/classic" class="lca-link">
              <div class="left-img-accueil">
                <img class="accueil-img-left" src="image/cv-int.png">
              </div>
              <div class="header-wine-card">
                <h1 class="discover"> {{str_decouvrir}} </h1>
                <h2 class="wine-card">{{str_classic}}</h2>
              </div>
            </router-link>
          </div>
          <div class="right-content-accueil">
            <router-link to="/interactive" class="rca-link">
              <div class="right-img-accueil">
                <img class="accueil-img-left" src="image/cv-inter.png">
              </div>
              <div class="header-wine-card">
                <h1 class="discover">{{str_decouvrir}}</h1>
                <h2 class="wine-card">{{str_Interactive}}</h2>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      str_decouvrir: "Découvrir la",
      str_classic: "Carte des vins classique",
      str_Interactive: "Carte des vins interactive"
    };
  },
  methods: {
    toFr: function() {
      this.str_decouvrir = "Découvrir la";
      this.str_classic = "Carte des vins classique";
      this.str_Interactive = "Carte des vins interactive";
    },
    toEn: function() {
      this.str_decouvrir = "Discover the";
      this.str_classic = "Classic wine list";
      this.str_Interactive = "Interactive wine list";
    }
  }
};
</script>