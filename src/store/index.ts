import { createStore } from 'vuex'

export default createStore({
  state: {
    likes: 0
  },
  mutations: {
    inc (state) {
      state.likes += 1;
    }
  },
  actions: {
  },
  modules: {
  }
})
