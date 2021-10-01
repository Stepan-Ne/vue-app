<template>
  <select  @change="changeSelect">
    <option disabled value="">Select from the list</option>
    <option v-for="option in options"
    :key="option.value"
     :value="option.value">
     {{option.title}}
     </option>
  </select>
</template>

<script lang='ts'>
import { Component, Prop} from 'vue-property-decorator'
import { Options, Vue } from "vue-class-component";

interface OptionsI {
    value: string
    title: string
}
@Options({
  name: "MySelect",
  components: {},
})
export default class MySelect  extends Vue {
//   @Prop() readonly msg!: string
  @Prop() readonly options: OptionsI[] = []
   @Prop(String) modelValue: any;

  changeSelect(event: any) {
    
      this.$emit('update:modelValue', event.target.value)
  }
}
</script>

<style scoped>

</style>