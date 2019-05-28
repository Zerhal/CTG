<template>
  <div>
    <header class="header">
      <div class="left-header">
        <router-link to="/" class="header__icon" id="header__icon">
          <i class="fas fa-home size:7x"></i>
        </router-link>
        <nav class="menu"></nav>
        <div class="logo">
          <img class="logo" src="/image/logo-2.png">
        </div>
      </div>
      <div class="right-header">
        <div class="search img-cont">
          <i class="fal fa-search"></i>
        </div>
        <div id="xzy" class="local-fr img-cont">
          <img src="/image/france.svg">
        </div>
        <div class="local-en img-cont">
          <img src="/image/united-kingdom.svg">
        </div>
      </div>
    </header>

    <div class="wine-detail">
      <div class="left-content-detail">
        <div class="left-content-image-header">
          <p class="name-vin">{{appellation}} {{name}} {{millesime}}</p>
          <p class="domaine-vin">{{domaine}}</p>
        </div>
        <div class="left-content-image">
          <img class="img-wine" :src="url_vin_image" alt="bordeaux">
        </div>
      </div>

      <div class="right-content-detail">
        <div class="overflow-rcd">
          <h1 @click="goBack()" class="back">
            <i class="far fa-angle-left"></i>
            {{str_retour}}
          </h1>
          <h5 class="region-couleur">{{ region }} | {{ couleur }}</h5>
          <div class="detail">
            <div class="detail1">
              <p>{{str_appellation}}{{ appellation }}</p>
              <p>{{str_degre}}{{degre}} °</p>
              <p>{{str_couleur}} {{couleur}}</p>
              <p>{{str_cepage}}{{cepage}}</p>
              <p>{{str_dosage}}{{dosage}}</p>
              <p v-if="bio === 1">
                Bio :
                <img src="/image/bio.svg" alt>
              </p>
            </div>
            <div class="detail2">
              <p>{{str_pays}}{{pays}}</p>
              <p>{{str_region}}{{region}}</p>
              <p>{{str_sousRegion}}{{sous_region}}</p>
              <p>{{str_commune}}{{commune}}</p>
              <p>{{str_superficie}}{{superficie}} m²</p>
              <p>{{str_classement}}{{classement}}</p>
            </div>
          </div>
          <div class="filtre action">
            <div @click="toggleGoogleMap" class="left-filter-detail">
              <p class="header-group-filter">
                <i class="far fa-map-marker-alt"></i>
                {{str_cdd}}
                <i class="far fa-angle-right"></i>
              </p>
            </div>
            <div v-if="visibleGooleMap" class="filtre act">
              <div class="left-filter-detail active header-filter-detail">
                <GmapMap
                  :center="{lat:this.longitude, lng:this.latitude}"
                  :zoom="12"
                  map-type-id="terrain"
                  
                  style="width: 450px; height: 300px"
                >
                  <GmapMarker
                    :key="index"
                    v-for="(m, index) in markers"
                    :position="m.position"
                    :clickable="true"
                    :draggable="true"
                    @click="center=m.position"
                  />
                </GmapMap>
              </div>
            </div>
            <div class="filtre action">
              <div @click="toggleContenanceDetail" class="left-filter-detail">
                <p>
                  <i class="far fa-wine-bottle"></i>
                  {{str_contenance}}
                  <i class="far fa-angle-right"></i>
                </p>
              </div>
              <div v-if="visibleContenanceDetail" class="filtre act">
                <div class="left-filter-detail active header-filter-detail">
                  <div class="contenances-block" v-for="qte in quantities" v-bind:key="qte.cl">
                    <div class="contenances">{{ qte.name }} {{ qte.cl }} cl</div>
                    <div class="prix">{{ qte.price}} €</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
      quantities: [],
      id: this.$route.params.id,
      name: "",
      visibleContenanceDetail: false,
      visibleGooleMap: false,
      myJson: json,
      pays: "",
      region: "",
      sous_region: "",
      appellation: "",
      cepage: "",
      couleur: "",
      classement: "",
      longitude: 0,
      latitude: 0,
      image_vin: "",
      dosage: 0,
      superficie: 0,
      commune: "",
      degre: 0,
      bio: "",
      image_parcelle: "",
      commentaire_fr: "",
      commentaire_en: "",
      domaine: "",
      millesime: 0,
      contenance: "",
      description: "",
      url_vin_image: "",
      url_pacerelle_image: "",

      str_retour: "retour",
      str_appellation: "Appellation : ",
      str_degre: "Degré : ",
      str_couleur: "Couleur : ",
      str_cepage: "Cépage : ",
      str_dosage: "Dosage : ",
      str_pays: "Pays : ",
      str_region: "Region : ",
      str_sousRegion: "Sous Région : ",
      str_commune: "Commune : ",
      str_superficie: "Superficie : ",
      str_classement: "Classement : ",
      str_cdd: "conseil de degustation",
      str_contenance: "contenance"
    };
  },
  methods: {
    toFr: function() {
      this.str_retour = "Retour";
      this.str_appellation = "Appellation : ";
      this.str_degre = "Degré : ";
      this.str_couleur = "Couleur : ";
      this.str_cepage = "Cépage : ";
      this.str_dosage = "Dosage : ";
      this.str_pays = "Pays : ";
      this.str_region = "Région : ";
      this.str_sousRegion = "Sous Région : ";
      this.str_commune = "Commune : ";
      this.str_superficie = "Superficie : ";
      this.str_classement = "Classement : ";
      this.str_cdd = "conseil de degustation";
      this.str_contenance = "contenance";
    },
    toEn: function() {
      this.str_retour = "Back";
      this.str_appellation = "Designation : ";
      this.str_degre = "Degree : ";
      this.str_couleur = "Color : ";
      this.str_cepage = "Grape : ";
      this.str_dosage = "Dosage : ";
      this.str_pays = "Country : ";
      this.str_region = "Region : ";
      this.str_sousRegion = "Sub Region : ";
      this.str_commune = "Town : ";
      this.str_superficie = "Area : ";
      this.str_classement = "Ranking : ";
      this.str_cdd = "tasting advice";
      this.str_contenance = "capacity";
    },
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    getUnfilteredData: function() {
      let color_id;
      this.myJson.items.forEach(element => {
        if (element.id === this.id) {
          this.pays = element.pays;
          this.name = element.name;
          this.region = element.region;
          this.sous_region = element.sous_region;
          this.appellation = element.appellation;
          this.cepage = element.cepage;
          color_id = element.color_id;
          this.classement = element.classement;
          this.longitude = element.longitude;
          this.latitude = element.latitude;
          this.dosage = element.dosage;
          this.superficie = element.superficie;
          this.commune = element.commune;
          this.degre = element.degres;
          this.bio = element.bio;
          this.commentaire_fr = element.commentaire_fr;
          this.commentaire_en = element.commentaire_en;
          this.domaine = element.domaine;
          this.millesime = element.millesime;
          this.contenance = element.contenance;
          this.description = element.description;
          this.image_vin = element.image_vin;
          this.image_parcelle = element.image_parcelle;
          this.url_vin_image = "/image/" + this.image_vin + ".jpg";
          this.url_pacerelle_image = "/image/" + this.image_parcelle + ".jpg";
          element.prices.forEach(obj => {
            this.myJson.quantities.forEach(elem => {
              if (elem.id === obj.quantity_id) {
                let cl, name, price;
                cl = elem.cl;
                name = elem.name;
                price = obj.price;
                this.quantities.push({ cl: cl, name: name, price: price });
              }
            });
          });
        }
        this.myJson.colors.forEach(el => {
          if (color_id === el.id) {
            this.couleur = el.name;
          }
        });
      });
    },
    toggleContenanceDetail: function() {
      this.visibleContenanceDetail = !this.visibleContenanceDetail;
    },
    toggleGoogleMap: function() {
      this.visibleGooleMap = !this.visibleGooleMap;
    }
  },
  mounted() {
    this.getUnfilteredData();
    var latlng = new google.maps.LatLng(39.305, -76.617);
    let map = new google.maps.Map(document.getElementById("map"), {
      center: latlng,
      zoom: 8
    });
  }
};
</script>

<style>
.img-cont {
  color: aqua;
}

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
