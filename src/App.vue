<template>

  <div class='app'>
    <h1>What do you think?</h1>
    <my-btn @click="openDialog">Add Post</my-btn>
    <my-dialog v-model:show="show">
      <!-- create is event &  createPost is listener -->
      <post-form @create="createPost" />
    </my-dialog>

    <post-list
      @remove="removeItem"
      :posts="posts"
    />

  </div>
</template>

<script lang='ts'>
import { Options, Vue } from "vue-class-component";
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";

export interface PostI {
  id: number;
  title: string;
  body: string;
}
@Options({
  name: "App",
  props: {},
  components: { PostForm, PostList },
})
export default class App extends Vue {
  // @Prop() readonly msg!: string
  //  @Prop({default: 'John doe'}) readonly name: string
  posts: PostI[] = [
    { id: 1, title: "JS", body: "It has proptotype-based object-orientation" },
    { id: 2, title: "JS", body: "It has curly-bracket syntax" },
  ];
  show: boolean = false;
  createPost(post: PostI, str: string) {
    this.posts.push(post);
    this.show = false;
  }
  removeItem(post: PostI) {
    this.posts = this.posts.filter((p) => p.id !== post.id);
  }
  openDialog() {
    this.show = true;
  }
}
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