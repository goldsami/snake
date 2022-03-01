const App = {
  data() {
    return {
      val: 0,
    };
  },
  methods: {
    increment() {
      this.val++;
    },
  },
};

Vue.createApp(App).mount('#app');
