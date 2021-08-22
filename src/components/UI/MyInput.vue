<template>
      <input 
      class="input"
        :value="modelValue"
        @input="updateInput"
        
      />
</template>

<script lang="ts">

import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Options({
  name: "MyInput",
})
export default class MyInput extends Vue {
   @Prop() readonly modelValue?: string = '';

 updateInput(event: any) {
   console.log(event.target.value)
   this.$emit("update:modelValue", event.target.value)
 }
}
</script>

<style scoped>
.input {
  width: 100%;
  border: 2px solid skyblue;
  margin-top: 15px;
  padding: 10px 15px;
} 
</style>