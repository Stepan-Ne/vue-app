<template>
  <navbar />
  <div class="app">
    <router-view />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Navbar from "@/components/UI/Navbar.vue";

@Options({
  name: "App",
  components: { Navbar },
})
export default class App extends Vue {}
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.app {
  padding: 20px;
}
</style>