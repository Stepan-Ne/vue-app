<template>
  <div>
    <h3>Create Post</h3>
    <form @submit.prevent>
      <my-input
        class="input"
        v-model="post.title"
        type="text"
        placeholder="title"
      />

      <my-input
        class="input"
        v-model="post.body"
        type="text"
        placeholder="description"
      />

      <my-btn
        class="btn"
        style="align-self: flex-end; margin-top: 15px"
        @click="createPost"
      >Create</my-btn>
    </form>
  </div>
</template>

<script lang='ts'>
interface PostI {
  title: string;
  body: string;
  id?: any;
}
import { Options, Vue } from "vue-class-component";

@Options({
  name: "PostForm",
  components: {},
})
export default class PostForm extends Vue {
  //   @Prop() readonly msg!: string
  //  @Prop({default: 'John doe'}) readonly name: string
  post: PostI = {
    title: "",
    body: "",
  };

  createPost() {
    this.post.id = Date.now();
    if (this.post.title && this.post.body) {
      // генерируем событие, на которое сможет подписаться родительский метод
      this.$emit("create", this.post, "test");
      this.post = {
        title: "",
        body: "",
      };
    }
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

</style>