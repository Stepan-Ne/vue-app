<template>
  <div class="list">
    <h3 v-if="!posts.length">List is empty</h3>
    <h3 v-else>Users List</h3>
    <transition-group name="post-list">
    <post-item
      v-for="post in posts"
      :key="post.id"
      :post="post"
      @remove="$emit('remove', post)"
    />
    </transition-group>
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
.post-list-item {
  display: inline-block;
  margin-right: 10px;
}
.post-list-enter-active,
.post-list-leave-active {
  transition: all .4s ease;
}
.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(-330px);
}
.post-list-move {
  transition: transform 0.5s ease;
}
</style>