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
            <option v-for="data in filteredData" :key="data.id">{{data.name}}</option>
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
        <div class="left-containter">
          <div class="menu-filtre">
            <div class="main-filtre">
              <div class="main-left-filter">
                <p>{{str_filtreHeader}}</p>
              </div>
            </div>

            <div class="filtre action">
              <div class="left-filter" @click="toggleContenance">
                <p>
                  <i class="far fa-wine-bottle"></i>
                  {{str_contenance}}
                  <i class="far fa-angle-right"></i>
                </p>
              </div>
              <transition name="fade">
                <div class="filtre act" v-if="visibleContenance">
                  <div id="watcher" class="left-filter active">
                    <div
                      class="radio"
                      v-for="quantities in myJson.quantities"
                      v-bind:key="quantities.id"
                    >
                      <input
                        type="radio"
                        :id="quantities.cl"
                        name="quantities"
                        :value="quantities.id"
                        v-model="filtre.contenances"
                        v-on:change="getfilteredData"
                      >
                      <label
                        class="label-radio"
                        :for="quantities.cl"
                      >{{ quantities.cl }} cl : {{ quantities.name }}</label>
                    </div>
                  </div>
                  <!-- <div class="filtre action">
                  <div class="left-filter" @click="togglePriceRange">
                    <p>
                      <i class="far fa-euro-sign"></i> TRANCHE DE PRIX
                      <i class="far fa-angle-right"></i>
                    </p>
                  </div>
                  <transition name="fade">
                    <div class="filtre act" v-if="visiblePriceRange">
                      <div class="left-filter active"></div>
                    </div>
                  </transition>
                  </div>-->
                </div>
              </transition>
            </div>

            <div class="filtre action">
              <div class="left-filter" @click="toggleDomaine">
                <p>
                  <i class="far fa-map-marker-alt"></i>
                  {{str_domaine}}
                  <i class="far fa-angle-right"></i>
                </p>
              </div>
              <transition name="fade">
                <div class="filtre act" v-if="visibleDomaine">
                  <div class="left-filter active">
                    <div class="domaine-ac">
                     <input 
                      placeholder="Domaine"
                      v-on:keyup="getfilteredData"
                      name="domaine"
                      id="domaine"
                      type="text"
                      v-model="domaine"
                      list="domaineL">
                      <datalist id="domaineL">
                        <option v-for="data in filteredData" :key="data.id">{{data.domaine}}</option>
                      </datalist>
                    </div>
                  </div>
                </div>
              </transition>
            </div>

            <div class="filtre action">
              <div class="left-filter" @click="toggleCouleur">
                <p>
                  <i class="far fa-wine-glass-alt"></i>
                  {{str_couleur}}
                  <i class="far fa-angle-right"></i>
                </p>
              </div>
              <transition name="fade">
                <div class="filtre act" v-if="visibleCouleur">
                  <div class="left-filter active">
                    <div class="radio" v-for="colors in myJson.colors" v-bind:key="colors.id">
                      <input
                        v-model="filtre.color"
                        v-on:change="getfilteredData"
                        type="radio"
                        :id="colors.name"
                        name="couleur"
                        :value="colors.id"
                      >
                      <label class="label-radio" :for="colors.name">{{ colors.name }}</label>
                    </div>
                  </div>
                </div>
              </transition>
            </div>

            <div class="filtre action">
              <div class="left-filter" @click="toggleMillesime">
                <p>
                  <i class="far fa-calendar-alt"></i>
                  {{str_millesime}}
                  <i class="far fa-angle-right"></i>
                </p>
              </div>
              <transition name="fade">
                <div class="filtre act" v-if="visibleMillesime">
                  <div class="left-filter active">
                    <select v-model="filtre.millesime" v-on:change="getfilteredData" id="millesime">
                      <option
                        v-for="millesime in allMillesime"
                        :key="millesime"
                        :value="millesime"
                      >{{ millesime }}</option>
                    </select>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
        <div class="right-containter">
          <div class="containter-header">
            <h2>{{str_decouvrir}} {{filtre.contenance}}</h2>
          </div>
          <h3 v-if="hasVinsBlancs">{{str_vinBlanc}}</h3>
          <router-link
            class="vin"
            v-for="data in filteredData"
            v-bind:key="data.id"
            v-if="data.color_id === 1"
            :to="{name: 'detail', params: {id: data.id}}"
          >
            <div class="nom-vin">{{ data.name }}</div>

            <div class="annee-vin">{{ data.millesime }}</div>

            <div
              class="prix-verre"
              v-for="prices in data.prices"
              v-bind:key="prices.id"
              v-if="prices.quantity_id === filtre.contenances"
            >{{ prices.price }} €</div>
          </router-link>
          <h3 v-if="hasVinsRouges">{{str_vinRouge}}</h3>
          <router-link
            class="vin"
            v-for="data in filteredData"
            v-bind:key="data.id"
            v-if="data.color_id === 2"
            :to="{name: 'detail', params: {id: data.id}}"
          >
            <div class="nom-vin">{{ data.name }}</div>

            <div class="annee-vin">{{ data.millesime }}</div>

            <div
              class="prix-verre"
              v-for="prices in data.prices"
              v-bind:key="prices.id"
              v-if="prices.quantity_id === filtre.contenances"
            >{{ prices.price }} €</div>
          </router-link>
          <h3 v-if="hasVinsRose">{{str_vinRose}}</h3>
          <router-link
            class="vin"
            v-for="data in filteredData"
            v-bind:key="data.id"
            v-if="data.color_id === 3"
            :to="{name: 'detail', params: {id: data.id}}"
          >
            <div class="nom-vin">{{ data.name }}</div>

            <div class="annee-vin">{{ data.millesime }}</div>

            <div
              class="prix-verre"
              v-for="prices in data.prices"
              v-bind:key="prices.id"
              v-if="prices.quantity_id === filtre.contenances"
            >{{ prices.price }} €</div>
          </router-link>
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
      filteredData: [],
      search: "",
      filtre: {
        domaine: "",
        contenances: 1,
        color: null,
        millesime: null
      },
      visibleContenance: false,
      visiblePriceRange: false,
      visibleDomaine: false,
      visibleCouleur: false,
      visibleMillesime: false,
      visibleVignoble: false,
      visibleAppelation: false,
      myJson: json,

      searchVisible: false,
      hasVinsBlancs: true,
      hasVinsRouges: true,
      hasVinsRose: true,
      allMillesime: [],

      str_filtreHeader: "filtrer votre recherche par",
      str_contenance: "contenance",
      str_domaine: "domaine",
      str_couleur: "couleur",
      str_millesime: "millesime",
      str_vinBlanc: "vins blancs",
      str_vinRouge: "vin rouges",
      str_vinRose: "rosés",
      str_decouvrir: "découvrir nos vins"
    };
  },
  methods: {
    toFr: function() {
      this.str_filtreHeader = "filtrer votre recherche par";
      this.str_contenance = "contenance";
      this.str_domaine = "domaine";
      this.str_couleur = "couleur";
      this.str_millesime = "millésime";
      this.str_vinBlanc = "vins blancs";
      this.str_vinRouge = "vin rouges";
      this.str_vinRose = "rosés";
      this.str_decouvrir = "découvrir nos vins";
    },
    toEn: function() {
      this.str_filtreHeader = "filter your search by";
      this.str_contenance = "capacity";
      this.str_domaine = "field";
      this.str_couleur = "color";
      this.str_millesime = "vintage";
      this.str_vinBlanc = "white wines";
      this.str_vinRouge = "red wine";
      this.str_vinRose = "rosés";
      this.str_decouvrir = "discover our wines";
    },
    equalAtCont: function(element) {
      let result = false;
      element.prices.forEach(obj => {
        if (obj.quantity_id === this.filtre.contenances) {
          result = true;
          return true;
        }
      });
      return result;
    },
    getMillesime: function() {
      let annee = [];
      this.myJson.items.forEach(obj => {
        let ajouterMillesime = 0;
        if (annee === []) {
          annee.push(obj.millesime);
        } else {
          annee.forEach(element => {
            if (obj.millesime === element) {
              ajouterMillesime++;
            }
          });
          if (ajouterMillesime === 0) {
            annee.push(obj.millesime);
          }
        }
      });
      this.allMillesime = annee;
      this.allMillesime.sort();
    },
    byColor: function(element) {
      let result = false;
      if (element.color_id === this.filtre.color) {
        result = true;
      }
      return result;
    },

    byMillesime: function(element) {
      let result = false;
      if (element.millesime === this.filtre.millesime) {
        result = true;
      }
      return result;
    },
    hasVin() {
      let countVinBlanc = 0;
      let countVinRouge = 0;
      let countVinRose = 0;
      this.filteredData.forEach(obj => {
        if (obj.color_id === 1) {
          countVinBlanc++;
        }
        if (obj.color_id === 2) {
          countVinRouge++;
        }
        if (obj.color_id === 3) {
          countVinRose++;
        }
      });

      if (countVinBlanc > 0) {
        this.hasVinsBlancs = true;
      } else {
        this.hasVinsBlancs = false;
      }

      if (countVinRouge > 0) {
        this.hasVinsRouges = true;
      } else {
        this.hasVinsRouges = false;
      }

      if (countVinRose > 0) {
        this.hasVinsRose = true;
      } else {
        this.hasVinsRose = false;
      }
    },
    onPriceChange(values) {
      this.priceMin = values[0];
      this.priceMax = values[1];
    },
    equalAtDom: function(element) {
      let result = false;
      element.prices.forEach(obj => {
        if (obj.quantity_id === this.filtre.contenances) {
          result = true;
          return true;
        }
      });
      return result;
    },
    getfilteredData: function() {
      this.filteredData = json.items;
      let filteredDataByfilters = [];
      //first check if filters where selected
      if (this.filtre.color != null) {
        filteredDataByfilters = this.filteredData.filter(this.byColor);
        this.filteredData = filteredDataByfilters;
      }
      if (this.filtre.millesime != null) {
        filteredDataByfilters = this.filteredData.filter(this.byMillesime);
        this.filteredData = filteredDataByfilters;
      }
      filteredDataByfilters = this.filteredData.filter(this.equalAtCont);
      this.filteredData = filteredDataByfilters;
      if (this.search !== "") {
        this.filteredData = json.items;
        filteredDataByfilters = this.filteredData.filter(
          obj => obj.name.toLowerCase().indexOf(this.search.toLowerCase()) >= 0
        );
        this.filteredData = filteredDataByfilters;
      }

      if (this.filtre.domaine !== "") {
        filteredDataByfilters = this.filteredData.filter(
          obj => obj.domaine.indexOf(this.filtre.domaine) >= 0
        );
        this.filteredData = filteredDataByfilters;
      }

      this.hasVin();
      this.getMillesime();
    },
    getUnfilteredData: function() {
      this.filteredData = json.items;
    },
    toggleContenance: function() {
      this.visibleContenance = !this.visibleContenance;
    },
    togglePriceRange: function() {
      this.visiblePriceRange = !this.visiblePriceRange;
    },
    toggleDomaine: function() {
      this.visibleDomaine = !this.visibleDomaine;
    },
    toggleCouleur: function() {
      this.visibleCouleur = !this.visibleCouleur;
    },
    toggleMillesime: function() {
      this.getMillesime();
      this.visibleMillesime = !this.visibleMillesime;
    },
    toggleVignoble: function() {
      this.visibleVignoble = !this.visibleVignoble;
    },
    toggleAppelation: function() {
      this.visibleAppellation = !this.visibleAppellation;
    },

    searchToggle: function() {
      this.searchVisible = !this.searchVisible;
    }
  },
  mounted() {
    this.getUnfilteredData();
    this.hasVin();
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
