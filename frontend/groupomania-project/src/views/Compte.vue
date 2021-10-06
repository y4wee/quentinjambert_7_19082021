<template>

    <div class="compte">
        <Nav />

        <div class="compteMain">

            <h1>Votre compte</h1>

            <div class="compteMainInfo">
                <span class="compteMainInfoNom"><strong>Nom:</strong> {{ user.nom }} </span>
                
                <span class="compteMainInfoPrenom"><strong>Prénom:</strong> {{ user.prenom }} </span>

                <span class="compteMainInfoRole" v-if="user.isAdmin"><strong>Role:</strong> Entitée supèrieure</span>
                <span class="compteMainInfoRole" v-else><strong>Role:</strong> simple Hummain</span>
                

                <div class="compteMainInfoDelete">
                    <div>Supprimer ce compte</div>
                    <input type="password" placeholder="password">
                    <button type="button">Confirmer</button>
                </div>
            </div>
            
        </div>

    </div>

</template>

<script>
import Nav from '../components/Nav.vue';
import { mapState } from 'vuex';

export default {
    name: 'Compte',
    components: {
        Nav
    },
    mounted: function() {
        if(this.$store.state.user.userId === 0) {
            this.$router.push('/');
            return;
        }
        this.$store.dispatch('articleGetAll');
        console.log(this.user)
    },
    computed: {
        ...mapState({
            user: 'user'
        }),
    }
}
</script>

<style scoped lang="scss">
.compte {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(249,249,249,1) 46%, #aeaeb1 100%);
    &Main {
        position: relative;
        z-index: 2;
        width: 800px;
        height: calc(100vh - 70px);
        background-color: white;
        margin-top: 70px;
        box-shadow: 0 8px 4px 1px #d1515a;
    }
}
</style>