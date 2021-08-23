<template>
  <div class="nav">
    <h3>Menu</h3>
    <div class="nav__btns">
      <my-btn @click="$router.push('/')">Home</my-btn>
      <my-btn
        style="margin-left: 20px"
        @click="$router.push('/posts')"
      >Posts</my-btn>
    </div>

  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import MyBtn from "@/components/UI/MyBtn.vue";
@Options({
  components: { MyBtn },
})
export default class Navbar extends Vue {}
</script>
<style scoped>
.nav {
  display: flex;
  padding: 15px;
  background: lightgrey;
  box-shadow: 2px 2px 4px grey;
  align-items: center;
}
.nav__btns {
  margin-left: auto;
}
</style>