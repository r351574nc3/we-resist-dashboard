<template>
  <div id="app" class="app">
    <DashboardHeader/>
    <div class="container-fluid">
      <div class="row">
        <Sidebar />
        <transition enter-active-class="animated fadeIn">
          <router-view />
        </transition>
      </div>
    </div>
  </div>
</template>


<script>
  import { Header as DashboardHeader, Sidebar, Navbar  } from './components/'
  export default {
    data (){
      return{
      }
    },
    components: {
      DashboardHeader,
      Navbar,
      Sidebar
    },
    computed: {
      name(){
        return this.$route.name
      },
      list() {
        return this.$route.matched
      },
      isAuth () {
        return this.$route.path.match('auth')
      }
    }
  }
</script>

<style lang="scss">
  @import "./assets/bootstrap/bootstrap";
  $fa-font-path: "../node_modules/font-awesome/fonts" !default;
  @import "./assets/scss/font-awesome";
  @import "./assets/style";
</style>