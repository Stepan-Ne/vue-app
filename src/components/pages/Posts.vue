<template>
  <my-input
    v-focus
    v-model="searchQuery"
    placeholder="Search..."
  />

  <div class="btns_group">
    <my-btn
      @click="openDialog"
      style=""
    >Add Post</my-btn>
    <base-my-select
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
  <div v-if="pending">
    <h5>Loading...</h5>
  </div>
  <div
    ref="observer"
    class="observer"
  ></div>
  <!-- <div class="page-wrapper">
      <div
        v-for="page in totalPages"
        :key="page"
        class="page"
        :class="{
        'current-page': page === pageNumber
      }"
        @click="chanePage(page)"
      >{{page}}</div>
    </div> -->

</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
// import { Watch } from "vue-property-decorator";
import axios from "axios";

export interface PostI {
  id: number;
  userId?: number;
  title: string;
  body: string;
}
@Options({
  name: "Posts",
  props: {},
  components: { PostForm, PostList },
})
export default class Posts extends Vue {
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
  pageNumber = 1;
  totalPages = 0;
  limit = 10;
  pending = false;
  mounted() {
    this.fetchPosts();
    var options = {
      // root: document.querySelector('#scrollArea'),
      rootMargin: "0px",
      threshold: 1.0,
    };
    const callback = (entries: any, observer: any) => {
      if (entries[0].isIntersecting && this.pageNumber < this.totalPages) {
        this.loadPosts();
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer as any);
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
  async fetchPosts(): Promise<void> {
    try {
      this.loading = true;
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts`,
        {
          params: {
            _limit: this.limit,
            _page: this.pageNumber,
          },
        }
      );

      this.loading = false;
      this.posts = response.data;
      this.totalPages = Math.ceil(
        response.headers["x-total-count"] / this.limit
      );
    } catch (err) {
      this.errMsg = err;
    } finally {
      this.loading = false;
    }
  }
  async loadPosts(): Promise<void> {
    try {
      this.pageNumber += 1;
      this.pending = true;
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts`,
        {
          params: {
            _limit: this.limit,
            _page: this.pageNumber,
          },
        }
      );

      this.pending = false;
      this.posts = [...this.posts, ...response.data];
      this.totalPages = Math.ceil(
        response.headers["x-total-count"] / this.limit
      );
    } catch (err) {
      this.errMsg = err;
    } finally {
      this.pending = false;
    }
  }
  chanePage(page: number) {
    this.pageNumber = page;
    this.fetchPosts();
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
.btns_group {
  display: flex;
  justify-content: space-between;
  margin: 15px;
}
.page-wrapper {
  display: flex;
  margin-top: 15px;
}
.page {
  border: 1px solid black;
  padding: 15px;
}
.current-page {
  border: 4px solid teal;
}
.observer {
  background: thistle;
  padding: 15px;
}
</style>
