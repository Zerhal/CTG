<template>
  <div class="site-content">
    <div class="container">
      <div class="left-containter">
        <div class="menu-filtre">
          <div class="main-filtre">
            <div class="main-left-filter">
              <p>FILTRER VOTRE RECHERCHE PAR</p>
            </div>
          </div>

          <div class="filtre action">
            <div class="left-filter"  @click="toggle">
              <p>
                <i class="far fa-euro-sign"></i> TRANCHE DE PRIX
                <i class="far fa-angle-right"></i>
              </p>
            </div>
            <transition name="fade">
              <div class="filtre act" v-if="visible">
                <div class="left-filter active">
                  <p>
                    <label for="amount">Price range:</label>
                    <input
                      type="text"
                      id="amount"
                      readonly
                      style="border:0; color:#f6931f; font-weight:bold;"
                    >
                  </p>

                  <div id="slider-range"></div>
                </div>
              </div>
            </transition>
          </div>

          <div class="filtre action">
            <div class="left-filter"  @click="toggle">
              <p>
                <i class="far fa-wine-bottle"></i> CONTENANCE
                <i class="far fa-angle-right"></i>
              </p>
            </div>
            <transition name="fade">
              <div class="filtre act" v-if="visible">
                <div class="left-filter active">
                  <div>
                    <input type="radio" id="contenance1" name="contenance" value="12">
                    <label for="contenance1">12 cl</label>

                    <input type="radio" id="contenance2" name="contenance" value="37,5">
                    <label for="contenance2">37,5 cl</label>

                    <input type="radio" id="contenance3" name="contenance" value="75">
                    <label for="contenance3">75 cl</label>
                  </div>
                </div>
              </div>
            </transition>
          </div>

          <div class="filtre action">
            <div class="left-filter"  @click="toggle">
              <p>
                <i class="far fa-map-marker-alt"></i> DOMAINE
                <i class="far fa-angle-right"></i>
              </p>
            </div>
            <transition name="fade">
              <div class="filtre act" v-if="visible">
                <div class="left-filter active">
                  <div class="domaine-cb">
                    <input type="checkbox" id="Lambray" name="Lambray" value="Lambray">
                    <label for="Lambray">Domaine des Lambray</label>
                    <br>
                    <input type="checkbox" id="Liger" name="Liger" value="Liger">
                    <label for="Liger">Domaine T.Liger-Belair</label>
                    <br>
                    <input type="checkbox" id="Jacqueson" name="Jacqueson" value="Jacqueson">
                    <label for="Jacqueson">Domaine Paul & Maire Jacqueson</label>
                    <br>
                    <input type="checkbox" id="Raquillet" name="Raquillet" value="Raquillet">
                    <label for="Raquillet">Domaine François Raquillet</label>
                    <br>
                    <input type="checkbox" id="Magnien" name="Magnien" value="Magnien">
                    <label for="Magnien">Domaine Frédéric Magnien</label>
                    <br>
                  </div>
                </div>
              </div>
            </transition>
          </div>

          <div class="filtre action">
            <div class="left-filter"  @click="toggle">
              <p>
                <i class="far fa-wine-glass-alt"></i> COULEUR
                <i class="far fa-angle-right"></i>
              </p>
            </div>
            <transition name="fade">
              <div class="filtre act" v-if="visible">
                <div class="left-filter active">
                  <div v-for="couleur in myJson.colors" v-bind:key="couleur.id">
                    <input type="radio" :id="{{ couleur.name }}" name="couleur" value="{{ couleur.name }}">
                    <label for="{{ couleur.name }}">{{ couleur.name }}</label>
                  </div>
                </div>
              </div>
            </transition>
          </div>

          <div class="filtre action">
            <div class="left-filter"  @click="toggle">
              <p>
                <i class="far fa-calendar-alt"></i> MILLESIME
                <i class="far fa-angle-right"></i>
              </p>
            </div>
            <transition name="fade">
              <div class="filtre act" v-if="visible">
                <div class="left-filter active">
                  <select id="millesime">
                    <option value="2018">2018</option>
                    <option value="2017" selected>2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                    <option value="2011">2011</option>
                    <option value="2010">2010</option>
                    <option value="2009">2009</option>
                  </select>
                </div>
              </div>
            </transition>
          </div>

          <div class="filtre action">
            <div class="left-filter"  @click="toggle">
              <p>
                <i class="fab fa-angellist"></i> VIGNIOBLE
                <i class="far fa-angle-right"></i>
              </p>
            </div>
            <transition name="fade">
              <div class="filtre act" v-if="visible">
                <div class="left-filter active">
                  <select id="millesime">
                    <option value="Alsace">Alsace</option>
                    <option value="Bordeaux" selected>Bordeaux</option>
                    <option value="Beaujolais">Beaujolais</option>
                    <option value="Bourgogne">Bourgogne</option>
                    <option value="Bugey">Bugey</option>
                    <option value="Champagne">Champagne</option>
                    <option value="Corse">Corse</option>
                    <option value="Jura">Jura</option>
                    <option value="Languedoc">Languedoc</option>
                    <option value="Sud-Ouest">Sud-Ouest</option>
                  </select>
                </div>
              </div>
            </transition>
          </div>

          <div class="filtre action">
            <div class="left-filter"  @click="toggle">
              <p>
                <i class="far fa-wheat"></i> APPELATION
                <i class="far fa-angle-right"></i>
              </p>
            </div>
            <transition name="fade">
              <div class="filtre act" v-if="visible">
                <div class="left-filter active">
                  <input id="tags">
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
      <div class="right-containter">
        <div class="containter-header">
          <h2>Decouvrir nos Vins au verre</h2>
        </div>
        <h3>VINS BLANCS</h3>
        <div class="vin"  v-for="data in myJson.items" v-bind:key="data.id" v-if="data.color.id === 1">
          <div class="nom-vin">{{ data.name }}</div>

          <div class="annee-vin">{{ data.millesime }}</div>

          <div class="prix-verre" v-for="prices in data.prices" v-if="prices.quantity_id === 1" >{{ prices.price }}</div>
        </div>
        <h3>VINS ROUGES</h3>
        <div class="vin"  v-for="data in myJson.items" v-bind:key="data.id" v-if="data.color.id === 2">
          <div class="nom-vin">{{ data.name }}</div>

          <div class="annee-vin">{{ data.millesime }}</div>

          <div class="prix-verre" v-for="prices in data.prices" v-if="prices.quantity_id === 1" >{{ prices.price }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import json from '../assets/wines.json'
let contenance, domaine, couleur, millesime, vignoble, appellation
export default {


  data() {
    return {
      visible: false,
      myJson: json,
      contenance,
      domaine,
      couleur,
      millesime,
      vignoble,
      appellation
    };
  },
  methods: {
    toggle: function() {
      this.visible = !this.visible;
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
