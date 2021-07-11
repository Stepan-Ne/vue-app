<template>

  <div class='app'>
    <h1>What do you think?</h1>

    <my-btn
      @click="openDialog"
      style="margin: 15px 0;"
    >Add Post</my-btn>

    <my-dialog v-model:show="show">
      <!-- create is event &  createPost is listener -->
      <post-form @create="createPost" />
    </my-dialog>

    <post-list
    v-if="!loading"
      @remove="removeItem"
      :posts="posts"
    />
    <h2 v-else>Loading...</h2>

  </div>
</template>

<script lang='ts'>
import { Options, Vue } from "vue-class-component";
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";

export interface PostI {
  id: number;
  userId?: number;
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
  posts: PostI[] | [] = []
  url: string = `https://jsonplaceholder.typicode.com/posts?_limit=5`;
  show: boolean = false;
  errMsg: any = "";
  loading: boolean = false;
  mounted() {
    this.fetchPosts(this.url)
  }
  // fetchPosts<T>(url: string): Promise<T> {
  //   this.loading = true
  //   return fetch(url)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       debugger
  //       setTimeout(() => {
  //         this.posts = res.data;
  //       }, 2000);
  //     })
  //     .catch((err) => (this.errMsg = err))
  //     .finally(() => (this.loading = false));
  // }
  async fetchPosts(url: string): Promise<void> {
    try {
          this.loading = true
       setTimeout(async () => {
        const response = await fetch(url);
        const data = await response.json();
        this.loading = false
        // debugger
        this.posts = data;
      }, 1500);
    } catch (err) {
      this.errMsg = err;
    }
    finally {
      // this.loading = false
    }
  }
  createPost(post: PostI, str: string) {
    (this.posts as any).push(post)
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