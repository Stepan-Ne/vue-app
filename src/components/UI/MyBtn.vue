<template>
      <button class="btn">
        <!-- все помещаемое в my-btn разместится в slot -->
        <slot></slot>
        </button>
</template>

<script lang="ts">

import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Options({
  name: "MyBtn",
})
export default class MyBtn extends Vue {
//   @Prop() readonly post!: PostI;
  //  @Prop({default: 'John doe'}) readonly name: string
  // onClick() {
  //     this.$emit('click')
  // }
}
</script>

<style scoped>
.btn {
  /* margin-top: 15px; */
  padding: 10px 15px;
  background: none;
  color: teal;
  border: 2px solid teal;
  /* ровняем по левому краю */
  /* align-self: start; */
}
</style>