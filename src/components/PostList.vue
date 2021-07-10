<template>
  <div class="list">
    <h3 v-if="!posts.length">List is empty</h3>
    <h3 v-else>Users List</h3>
    <post-item
      v-for="post in posts"
      :key="post.id"
      :post="post"
      @remove="$emit('remove', post)"
    />
  </div>
</template>

<script lang='ts'>
import { Options, Vue } from "vue-class-component";
import PostI from "@/App.vue";
import PostItem from "@/components/PostItem.vue";
@Options({
  props: {
    posts: PostI,
  },
  name: "PostList",
  components: { PostItem },
})
export default class PostList extends Vue {
  //   @Prop() readonly msg!: string
  //  @Prop({default: 'John doe'}) readonly name: string
}
</script>

<style scoped>
.list {
  margin-top: 20px;
}
</style>