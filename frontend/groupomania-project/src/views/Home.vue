<template>
  <div class="main">

    home Page
    <button @click="logout()">
        Déconnexion !
    </button>

  </div>
</template>

<script>
    export default {
        name: 'Home',
        components: {

        },
        mounted: function() {
            if(this.$store.state.user.userId === 0) {
                this.$router.push('/');
                return;
            }
            this.$store.dispatch('articleGetAll');
        },
        methods: {
            logout: function() {
                this.$store.commit('logout');
                this.$router.push('/');
            },
        }
    }
</script>

<style scoped lang="scss">

</style>
