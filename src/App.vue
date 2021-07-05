<template>
  <div class='app'>
    <div>
      <h3>Create Post</h3>
      <form>
        <input class="input" type="text" placeholder="title"/>
        <input class="input" type="text" placeholder="description"/>
        <button class="btn">Create</button>
      </form>
    </div>
    <div class="post" v-for="post in posts" :key="post.id">
      <div class="">
        <strong>Title:</strong> {{post.title}}
      </div>
      <div class="">
        <strong>Description:</strong> {{post.description}}
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Options, Vue } from 'vue-class-component'

interface PostI {
  id: number
  title: string
  description: string
}
@Options({
  props: {}, 
  components: {}
})
export default class App extends Vue {
  // @Prop() readonly msg!: string
//  @Prop({default: 'John doe'}) readonly name: string
posts: PostI[] = [
  {id: 1, title: 'JS', description: 'It has proptotype-based object-orientation'},
  {id: 1, title: 'JS', description: 'It has curly-bracket syntax'},

]
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
.post {
  border: 2px solid orange;
  padding: 15px;
  margin-top: 15px;
}
form {
  display: flex;
  flex-direction: column;
}
.input {
  width: 100%;
  border: 2px solid skyblue;
  margin-top: 15px;
  padding: 10px 15px;
}
.btn {
  margin-top: 15px;
  padding: 10px 15px;
  background: none;
  color: teal;
  border: 2px solid teal;
  /* ровняем по левому краю */
  align-self: start;
}
</style>