<template>
  <h2>There is post with id: {{$route.params.id}}</h2>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
// import { Prop } from "vue-property-decorator";

@Options({
  name: "PostItem",
  components: {},
})
export default class Post extends Vue {
  //   @Prop() readonly post!: PostI;
  //  @Prop({default: 'John doe'}) readonly name: string
}
</script>
<style scoped>
</style>