<template>

  <div class="post">

    <div>
      <div class="">
        <strong>Title:</strong> {{post.title}}
      </div>
      <div class="">
        <strong>Description:</strong> {{post.body}}
      </div>
    </div>

    <div class="post_btns">
      <my-btn @click="$emit('remove', post)">Delete</my-btn>
    </div>
    <div class="post_btns">
      <my-btn @click="$router.push(`/posts/${post.id}`)">Open</my-btn>
    </div>

  </div>

</template>

<script lang='ts'>
interface PostI {
  title: string;
  body: string;
  id?: any;
}
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
// import MyBtn from "@/components/UI/MyBtn.vue";

@Options({
  name: "PostItem",
  components: {
    //   MyBtn
  },
})
export default class PostItem extends Vue {
  @Prop() readonly post!: PostI;
  //  @Prop({default: 'John doe'}) readonly name: string
}
</script>

<style scoped>
.post {
  border: 2px solid orange;
  padding: 15px;
  margin-top: 15px;
  display: flex;
  /* центруем по вертикали */
  align-items: center;
  justify-content: space-between;
}
</style>