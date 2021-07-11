<template>
  <div class="dialog" v-if="show" @click="hideDialog">
    <div @click.stop class="dialog_content">
        <slot></slot>
    </div>
  </div>
</template>

<script lang='ts'>
import { Options, Vue } from "vue-class-component";
import { Prop } from 'vue-property-decorator'
@Options({
    name: "MyDialog"
})
export default class MyDialog extends Vue {
   @Prop() readonly show!: boolean
//   @Prop({default: false}) readonly show: boolean
hideDialog() {
    this.$emit("update:show", false)
}
}
</script>

<style scoped>
.dialog {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.4);
    position: fixed;
    /* flex для возможности отцентровать content */
    display: flex;
}
.dialog_content {
    /* centering */
    margin: auto;
    background: white;
    border-radius: 12px;
    padding: 15px;
}
</style>