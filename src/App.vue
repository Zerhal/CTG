<template>
  <div id="app">
    <Header></Header>
    <InteractiveVue></InteractiveVue>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import InteractiveVue from './components/InteractiveVue.vue'

export default {
  name: 'app',
  components: {
    Header,
    InteractiveVue
  }
}
</script>

