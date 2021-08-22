<template>
  <div class="app">
    <h1>What do you think?</h1>

    <my-input
      v-model="searchQuery"
      placeholder="Search..."
    />

    <div class="btns_group">
      <my-btn
        @click="openDialog"
        style=""
      >Add Post</my-btn>
      <my-select
        :options="options"
        v-model="optionSelect"
      />
    </div>

    <my-dialog v-model:show="show">
      <!-- create is event &  createPost is listener -->
      <post-form @create="createPost" />
    </my-dialog>

    <post-list
      v-if="!loading"
      @remove="removeItem"
      :posts="sortedAndSerchedPosts"
    />
    <div v-else>
      <h5>Loading...</h5>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import { Watch } from "vue-property-decorator";

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
  posts: PostI[] | [] = [];
  url: string = `https://jsonplaceholder.typicode.com/posts?_limit=5`;
  show: boolean = false;
  errMsg: any = "";
  loading: boolean = false;
  options: any = [
    { title: "Название", value: "title" },
    { title: "Содержание", value: "body" },
  ];
  optionSelect: string = "";
  searchQuery: string = "";
  mounted() {
    this.fetchPosts(this.url);
  }
  // @Watch('optionSelect')
  // changeoOtionSelect(newVal: any) {
  //   this.posts.sort((post1: any, post2: any): any => {
  //     return post1[newVal]?.localeCompare(post2[newVal])
  //   })
  // }
  get sortedPosts() {
    return this.posts.sort((post1: any, post2: any): any => {
      return post1[this.optionSelect]?.localeCompare(post2[this.optionSelect]);
    });
  }
  get sortedAndSerchedPosts() {
    return this.sortedPosts.filter((post: any): any => {
      return post.title.toLowerCase().includes(this.searchQuery.toLowerCase());
    });
  }
  async fetchPosts(url: string): Promise<void> {
    try {
      this.loading = true;
      const response = await fetch(url);
      const data = await response.json();
      this.loading = false;
      this.posts = data;
    } catch (err) {
      this.errMsg = err;
    } finally {
      this.loading = false;
    }
  }
  createPost(post: PostI, str: string) {
    // (this.posts as any).push(post);
    this.posts = [post, ...this.posts];
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
.btns_group {
  display: flex;
  justify-content: space-between;
  margin: 15px;
}
</style>
