<template>
  <div class="home">
    <signin/>
  </div>
</template>

<script>
// @ is an alias to /src
import signin from '@/components/signin.vue'
import { mapActions } from 'vuex'

export default {
  name: 'home',
  components: {
    signin
  },
  methods: {
    ...mapActions([
      'woof'
    ]),
    woog () {
      this.woof()
    }
  }
}
</script>

<style scoped>
  .home {
    height: 100vh;
    background-image: url("https://images.pexels.com/photos/886521/pexels-photo-886521.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260");
  }

</style>

