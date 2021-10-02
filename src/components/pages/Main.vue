<template>
  <h2>What do you think about?</h2>
  <h3>Likes: {{$store.state.likes}}</h3>
  <my-btn @click="$store.commit(`inc`)">Inc</my-btn>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
export default class Main extends Vue {}
</script>